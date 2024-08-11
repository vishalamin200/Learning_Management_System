import userModel from "../models/user.model.js"
import { razorpay } from "../server.js"
import crypto from 'crypto'

const getKeyId = (req, res, next) => {
    try {
        return res.success(200, "KeyId Fetched", process.env.RAZORPAY_KEY_ID)
    } catch (error) {
        return res.sendError(400, "Error in Getting Key Id")
    }
}

const createSubcription = async (req, res, next) => {
    // Get User data and Verify it 

    try {
        const userId = req.user.id

        const User = userModel.findById(userId)

        //User isn't Logged In or In
        if (!User) {
            return res.sendError(401, "User Doesn't exist For given Id", "Unauthorized User")
        }

        if (User.role === 'ADMIN') {
            return res.sendError(400, "Admin Can't Purchase Subscription!", { Name: User.fullName, email: User.email, role: User.role })
        }

        //create Subcription for User
        const subcription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            customer: {
                name: User.name,
                email: User.email
            }
        })

        User.subcription.id = subcription.subcriptionId
        User.subcription.status = subscription.status
        await User.save()

        return res.success(200, "Subscription Created Successfully", subcription)

    } catch (error) {
        return res.sendError(400, "Error In Creating A Subcription", error.message)
    }
}

const verifySubscription = async (req, res, next) => {
    try {
        const userId = req.user.id

        const { payment_id, subscription_id, signature } = req.body

        const User = userModel.findById(userId)

        //User isn't Logged In or In
        if (!User) {
            return res.sendError(401, "User Doesn't exist For given Id", "Unauthorized User")
        }

        //generate new Signature, using payment_id,Subscription_id and webhook Secret,   and Verify

        // notes RAZORPAY_SECRET is still not provided 
        const subcriptionId = User.subcription.id

        const generateSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(`${payment_id}|${subcriptionId}`)
            .digest('hex')

        if (generateSignature !== signature) {
            return res.sendError(400, "Verification Failed!, Please Retry")
        }

        User.subcription.status = "active"
        await User.save()
        return res.success(200, "Verified Successfully", User)
    } catch (error) {
        return res.sendError(400, "Error in Verification of Subscription")
    }
}

const cancelSubscription = async (req, res, next) => {
    try {
        const userId = req.user.id

        const User = await userModel.findById(userId)

        //User isn't Logged In or Unauthorized
        if (!User) {
            return res.sendError(401, "User Doesn't exist For given Id", "Unauthorized User")
        }

        if (User.role === 'ADMIN') {
            return res.sendError(400, "ADMIN Can't Unsubscribe", User)
        }

        const subcriptionId = User.subcription.id
        if (!subcriptionId) {
            return res.sendError(400, "Subscription Id Doesn't Exist", User.subcription)
        }

        const cancelSub = await razorpay.subscriptions.cancel(subcriptionId)

        User.subscription.status = cancelSub.status
        await User.save()

        return res.success(200, "Unsubscribed Successfully", cancelSub)

    } catch (error) {
        return res.sendError(400, "Error In Cancelling Subscription")
    }
}

const getAllSubscriptions = async (req, res) => {
    try {
        const { count, skip } = req.query

        const allSubscription = await razorpay.subscriptions.all({ count: count || 20, skip: skip || 0 })

        return res.success(200, "All Subscription Fetch Successfully", allSubscription)

    } catch (error) {
        return res.sendError(400, "Error in Fetching All Subscription")
    }
}

export {
    getKeyId,
    createSubcription,
    verifySubscription,
    cancelSubscription,
    getAllSubscriptions
}