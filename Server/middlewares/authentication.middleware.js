import JWT from 'jsonwebtoken'
import userModel from '../models/user.model.js'

const isLoggedIn = async (req, res, next) => {

    try {
         const { token } = req.cookies
            
        // If user doesn't have any token means user is unauthrised or not loggedin
        if (!token) {
            return res.sendError(400, "User is Not loggedIn", "Token Might be Expired")
        }

        // user have a valid token
        if (token && token != "") {

            const userDetails = JWT.verify(token, process.env.JWT_SECRET_KEY)
 
            const userId = userDetails.id
            if (!userId) {
                return res.sendError(401, "Please Login, And Try Again")
            }

            const User = await userModel.findById(userId)
            if (!User) {
                return res.sendError(401, "Unauthorized User")
            }

            // we create a method in req object as .user which have the details of curr user
            req.user = userDetails
        }
        next()

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.sendError(400, "Session Expired, Please Login Again", error.name)
        }else if(error.message === 'invalid signature'){
            return res.sendError(401,"Token Is Tempered, Please Login Again",error.name)
        }
         else {
            return res.sendError(400, "Error in isLoggedIn Middleware", error.message)
        }
    }
}

export default isLoggedIn

