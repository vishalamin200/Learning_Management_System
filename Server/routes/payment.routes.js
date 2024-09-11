import { Router } from "express";
import { cancelSubscription, createOrder, createSubscription, fetchAllPayments, fetchPurchaseHistory, getAllSubscriptions, getKeyId, verifyOrder, verifySubscription } from "../controllers/payment.controllers.js";
import isLoggedIn from "../middlewares/authentication.middleware.js";

const router = Router()

router.route('/getKeyId').get(getKeyId)

router.route('/createOrder').post(isLoggedIn,createOrder)

router.route('/verifyOrder').post(isLoggedIn,verifyOrder)

router.route("/subscribe").post(isLoggedIn, createSubscription)

router.route("/verify").post(isLoggedIn, verifySubscription)

router.route('/unsubscribe').post(isLoggedIn, cancelSubscription)

router.route('/purchaseHistory').get(isLoggedIn,fetchPurchaseHistory)

router.route('/fetchAllPayments').post(isLoggedIn,fetchAllPayments)

router.route("/").get(getAllSubscriptions)


export default router
