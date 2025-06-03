import { Router } from "express";
import { sendUsMessage } from "../controllers/contact.controllers.js";

const router = Router()

router.route('/sendUsMessage').post(sendUsMessage)



export default router