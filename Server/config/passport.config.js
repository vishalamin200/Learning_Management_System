import passport from "passport"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import userModel from "../models/user.model.js"
import { configDotenv } from "dotenv"
configDotenv()


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID, 
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        //save the profile information in the database
        try {
            let user = await userModel.findOne({ email: profile.emails[0].value })
            if (!user) {
                //first time user
                const newUser = {
                    googleId: profile.id,
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: {
                        secure_url: profile.photos[0].value
                    }
                }
                user = await userModel.create(newUser)
            } 

            return done(null, user)
        } catch (error) {
            return done(error, null)
        }
    }))



export default passport