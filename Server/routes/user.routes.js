import { Router } from "express";
import { deleteAccount, deleteUserOrInstructor, editProfile, fetchStudentsAndInstructors, forgetPassword, getProfile, login, logout, register, resetPassword, updatePassword } from "../controllers/user.controllers.js";
import upload from "../middlewares/multer.middleware.js";
import isLoggedIn from "../middlewares/authentication.middleware.js";
import { authorizedRoles } from "../middlewares/authorization.middleware.js";

const router = Router()

      
router.post('/register', upload.single('avatar'), register)
router.post('/login', login)
router.get('/getProfile', isLoggedIn, getProfile)
router.patch('/editProfile', isLoggedIn, upload.single('avatar'), editProfile)
router.get('/logout', isLoggedIn, logout)
router.post('/updatePassword', isLoggedIn, updatePassword)
router.post('/forgetPassword', forgetPassword)

router.post('/resetPassword/:userId/:token', resetPassword)
router.delete('/deleteAccount', isLoggedIn, deleteAccount)

router.get('/fetchStudentsAndInstructors',isLoggedIn,fetchStudentsAndInstructors)
router.post('/deleteUserOrInstructor',isLoggedIn,authorizedRoles('ADMIN'),deleteUserOrInstructor)


export default router

