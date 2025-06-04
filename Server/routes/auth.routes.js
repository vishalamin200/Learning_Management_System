import { Router } from "express"
import passport from "passport"
import userModel from "../models/user.model.js"

const router = Router()

router.get('/google', passport.authenticate("google", { scope: ['email', 'profile'] }))


router.get('/google/callback', passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/auth/login`
}), async (req, res) => {
    if (req.user) {
        // We will set the cookie for the user so that he/she can stay login
        const userId = req.user._id

        const User = await userModel.findById(userId)

        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }
        const userToken = await User.generateJwtToken()
        res.cookie("token", userToken, cookieOptions)

        return res.redirect(`${process.env.CLIENT_URL}/auth-login/success`)
    }
})



export default router