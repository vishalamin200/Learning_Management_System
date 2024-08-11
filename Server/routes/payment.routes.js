import { Router } from "express";
import { cancelSubscription, createSubcription, getAllSubscriptions, verifySubscription } from "../controllers/payment.controllers.js";
const router = Router()

router.route('/getKeyId')

router.route("/subscribe").post(createSubcription)

router.route("/verify").post(verifySubscription)

router.route('/unsubscribe').post(cancelSubscription)


router.route("/").get(getAllSubscriptions)


export default router
