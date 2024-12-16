import crypto from 'crypto'
import courseModel from '../models/course.model.js'
import userModel from "../models/user.model.js"
import { razorpay } from "../server.js"

const getKeyId = (req, res, next) => {
    try {
        return res.success(200, "KeyId Fetched", process.env.RAZORPAY_KEY_ID)
    } catch (error) {
        return res.sendError(400, "Error in Getting Key Id")
    }
}

const createOrder = async (req, res) => {
    try {

        const { courseId } = req.body
        if (!courseId) {
            return res.sendError(400, "CourseId Is Missing")
        }

        const course = await courseModel.findById(courseId)
        if (!course) {
            return res.sendError(400, "No Course Exists With Provided Course Id")
        }
        const userId = req?.user?.id
        if (!userId) {
            return res.sendError(401, "Please Login And Try Again")
        }

        const user = await userModel.findById(userId)
        if (!user) {
            return res.sendError(401, "Unauthorized User")
        }


        //store the order_id in the database
        if (user.role === 'ADMIN') {
            return res.sendError(400, "Admin Can't Purchase Course")
        }

        if (user.role === 'INSTRUCTOR') {
            return res.sendError(400, "Instructor Can't Purchase Course")
        }

        //Check Whether any order is created Already Or not
        const courseSubscription = await user?.subscriptions?.find((sub) => sub.courseId === courseId)

        if (courseSubscription && courseSubscription?.subscription_status === 'active') {
            //already have active subscription
            return res.success(200, "You Have Already Purchased The Course", courseId)
        }

        const coursePrice = course?.price
        const discount = course?.discount

        const finalPrice = Math.trunc(coursePrice - (discount * coursePrice) / 100)

        if (finalPrice === 0) {
            const expiryDate = new Date()
            expiryDate.setFullYear(expiryDate.getFullYear() + 2)

            const freeSubscribeDetails = {
                courseId,
                courseTitle: course.topic,
                subscription_status: 'active',
                purchaseAt: Date.now(),
                expiresAt: expiryDate,
                paymentDetails: {
                    amount: 0,
                    userName: user?.fullName,
                    userEmail: user?.email
                }
            }

            user.subscriptions.push(freeSubscribeDetails)
            await user.save()

            return res.success(200, "Enrolled Successfully", 'Free')
        }


        const options = {
            amount: finalPrice * 100,
            currency: 'INR',
            receipt: `order_reciept_${courseId}`,
            payment_capture: 1,
            notes: {
                courseId,
                courseTitle: course?.topic,
                finalPrice: finalPrice,
                userName: user?.fullName,
                userEmail: user?.email
            },
        }

        const order = await razorpay.orders.create(options)


        const paymentDetails = {
            courseId,
            courseTitle: course?.topic,
            order_id: order.id,
            subscription_status: order?.status,
        }


        if (courseSubscription && courseSubscription?.subscription_status == 'created') {
            //order was created but payment wasn't completed
            courseSubscription.order_id = order?.id
        } else {
            //First time purchasing user
            user?.subscriptions?.push(paymentDetails)
        }

        await user.save()

        return res.success(200, "Order Created Successfully", order)
    } catch (error) {
        return res.sendError(400, "Error In Creating Order", error.message)
    }
}

const createSubscription = async (req, res, next) => {
    // Get User data and Verify it 

    try {

        const { courseId } = req.body
        if (!courseId) {
            return res.sendError(400, "Course Id Is Not Provided")
        }

        const userId = req.user.id
        const User = await userModel.findById(userId)

        //User isn't Logged In or In
        if (!User) {
            return res.sendError(401, "User Is Not Logged In", "Unauthorized User")
        }

        if (User.role === 'ADMIN') {
            return res.sendError(400, "Admin Can't Purchase Subscription!", { Name: User.fullName, email: User.email, role: User.role })
        }

        if (User.role === 'INSTRUCTOR') {
            return res.sendError(400, "Instructor Can't Purchase Subscription!", { Name: User.fullName, email: User.email, role: User.role })
        }

        //Check Whether any subscription is created for the given course or not
        const courseSubscription = User?.subscriptions?.find((sub) => sub.courseId === courseId)

        if (courseSubscription && courseSubscription?.subscription_status === 'active') {
            //already have active subscription
            return res.success(200, "You Have Already Purchased The Course", courseId)
        }


        //Creating the end date of the subscription, subscription will end in 2 year after the purchase

        const startDate = new Date()

        const oneYearLater = new Date(startDate)
        oneYearLater.setFullYear(startDate.getFullYear() + 2)
        const endAtDate = Math.floor(oneYearLater.getTime() / 1000)

        const startAtDate = Math.floor(startDate.getTime() / 1000 + 300)


        // create Subscription for User
        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            start_at: startAtDate,
            end_at: endAtDate,
        })



        const courseSubscriptionDetails = {
            courseId,
            subscription_id: subscription?.id,
            subscription_status: subscription?.status
        }

        if (courseSubscription && courseSubscription?.subscription_status == "created") {
            //payment created but payment is not completed
            courseSubscription.subscription_id = subscription?.id
        } else {
            // First Time purchasing the course
            User.subscriptions.push(courseSubscriptionDetails)
        }

        await User.save()
        return res.success(200, "Subscription Created Successfully", subscription)

    } catch (error) {
         return res.sendError(400, "Error In Creating A Subscription", error.message)
    }
}

const verifyOrder = async (req, res) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, courseId } = req.body
    const userId = req?.user?.id

    const user = await userModel.findById(userId)
    if (!user) {
        return res.sendError(401, "Unauthorized User")
    }

    const subscription = user.subscriptions.find((sub) => sub.courseId === courseId)
    if (!subscription) {
        return res.sendError(400, "Payment Is Not Initiated For This Course")
    }

    const orderId = subscription?.order_id


    const generated_signature = await crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
        .update(orderId + '|' + razorpay_payment_id).digest('hex')

    if (generated_signature !== razorpay_signature) {
        return res.sendError(400, 'Payment Verification Failed!')
    }

    subscription.subscription_status = 'active'

    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 2)

    const purchaseDate = Date.now()

    subscription.expiresAt = expiryDate
    subscription.purchaseAt = purchaseDate


    //Generate the payment details and store in db
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id)
    subscription.paymentDetails = paymentDetails

    await user.save()

    return res.success(200, "Payment Verified Successfully", user)
}

const verifySubscription = async (req, res, next) => {
    try {
        const userId = req?.user?.id

        const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature, courseId } = req.body

        const User = await userModel.findById(userId)

        //User isn't Logged In or In
        if (!User) {
            return res.sendError(401, "User Doesn't exist For given Id", "Unauthorized User")
        }

        if (!courseId) {
            return res.sendError(400, "CoureseId Is Not Provided")
        }

        //generate new Signature, using payment_id,Subscription_id and webhook Secret,   and Verify

        const subscription = User.subscriptions.find((sub) => sub.courseId === courseId)

        if (!subscription) {
            return res.sendError(400, "No Subscription Exists For This Course")
        }

        const subscriptionId = subscription?.subscription_id


        const generateSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
            .update(`${razorpay_payment_id}|${subscriptionId}`)
            .digest('hex')

        if (generateSignature !== razorpay_signature) {
            return res.sendError(400, "Payment Verification Failed!, Please Retry")
        }

        subscription.subscription_status = "active"
        await User.save()
        return res.success(200, "Payment Verified Successfully", User)
    } catch (error) {
        return res.sendError(400, "Error in Verification of Subscription", error.description)
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
            return res.sendError(400, "Admin Can't Unsubscribe", User)
        }

        if (User.role === 'INSTRUCTOR') {
            return res.sendError(400, "Instructor Can't Unsubscribe", User)
        }

        const subscriptionId = User.subscription.id
        if (!subscriptionId) {
            return res.sendError(400, "Subscription Id Doesn't Exist", User.subscription)
        }

        const cancelSub = await razorpay.subscriptions.cancel(subscriptionId)

        User.subscription.status = cancelSub.status
        await User.save()

        return res.success(200, "Unsubscribed Successfully", cancelSub)

    } catch (error) {
        return res.sendError(400, "Error In Cancelling Subscription")
    }
}

const fetchPurchaseHistory = async (req, res) => {
    // Course title, createdAt, expiredAt, price, payment Method, status
    try {

        const userId = req?.user?.id
        const user = await userModel.findById(userId)

        const subscriptions = user?.subscriptions

        const paymentHistory = subscriptions?.filter((sub) => sub.subscription_status != 'created').map((sub) => (
            {
                courseId: sub?.courseId,
                purchaseAt: sub.purchaseAt,
                expiresAt: sub.expiresAt,
                status: sub.subscription_status,
                amount: sub?.paymentDetails?.amount,
                paymentMethod: sub?.paymentDetails?.method,
                courseTitle: sub?.courseTitle,
                notes: sub?.paymentDetails?.notes
            }
        ))
         return res.success(200, 'Payment History Fetch Successfully', paymentHistory)
    } catch (error) {
        return res.sendError(400, "Error In Fetching Payment History", error.message)
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

const fetchAllPayments = async (req, res) => {

    try {
        const { count, skip, year  } = req.body
       
    
        // Function to fetch payments for a given month
        async function fetchPaymentsForMonth(year, month) {
            try {
                // Create the date range for the month
                const startDate = new Date(year, month - 1, 1); // First day of the month
                const endDate = new Date(year, month, 0); // Last day of the month
    
                const from = Math.floor(startDate.getTime() / 1000); // Convert to UNIX timestamp (seconds)
                const to = Math.floor(endDate.getTime() / 1000); // Convert to UNIX timestamp (seconds)
    
                const payments = await razorpay.payments.all({
                    from: from,
                    to: to,
                });
    
                 return payments;
            } catch (error) {
                return res.sendError(400,"Error In fetching Monthly Payments",error.message)
            }
        }
    
         async function fetchYearlyPayments(year) {
     
            const paymentsByMonth = {};  
            const totalAmountsByMonth = {}; 
            let yearlyTotal = 0;
            
            const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    
            try {
                for (let month = 1; month <= 12; month++) {
                     const payments = await fetchPaymentsForMonth(year, month);
    
                     const totalAmountForMonth = payments.items.reduce((sum, payment) => sum + payment.amount, 0);
    
                    paymentsByMonth[monthNames[month-1]] = payments;
                    totalAmountsByMonth[monthNames[month-1]] = totalAmountForMonth/100; // store in rupees
    
                    // Add the total amount for the month to the yearly total
                    yearlyTotal += totalAmountForMonth;
                }
    
                return {
                    paymentsByMonth,
                    totalAmountsByMonth,
                    yearlyTotal
                };
            } catch (error) {
                return res.sendError(400,'Error In fetching yearly payments',error.message)
            }
        }
         const {paymentsByMonth,totalAmountsByMonth,yearlyTotal} = await fetchYearlyPayments(year)
    
        return res.success(200, "Fetched All Payment Successfully",  {paymentsByMonth,totalAmountsByMonth,yearlyTotal} )
        
    } catch (error) {
        // return res.sendError(400,"Error In Fetching All Payments" ,error.message) 
    }
}

 
export {
    cancelSubscription, createOrder, createSubscription, fetchAllPayments, fetchPurchaseHistory, getAllSubscriptions, getKeyId, verifyOrder, verifySubscription
}

