import express from "express";
import { Router } from "express";
import { register, login, getProfile, logout, updatePassword, forgetPassword, resetPassword } from "../controllers/user.controllers.js";
import isLoggedIn from "../middlewares/user.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router()

router.post('/register', upload.single('avatar'), register)
router.post('/login', login)
router.get('/getProfile', isLoggedIn, getProfile)
router.get('/logout', isLoggedIn, logout)
router.post('/updatePassword', isLoggedIn, updatePassword)
router.post('/forgetPassword', forgetPassword)

router.post('/resetPassword/:userId/:token', resetPassword)
export default router