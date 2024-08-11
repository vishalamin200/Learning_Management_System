import userModel from "../models/user.model.js"
import JWT from 'jsonwebtoken'

const isLoggedIn =  (req,res,next)=>{

    try {
        const {token} = req.cookies

        // If user doesn't have any token means user is unauthrised or not loggedin
        if(!token){
            return res.sendError(401,"User is Not loggedIn","Token Might be Expired")
        }
    
        // user have a valid token
        if(token){
            const userDetails = JWT.verify(token, process.env.JWT_SECRET_KEY)
    
            // we create a method in req object as .user which have the details of curr user
            req.user = userDetails
        }
        next()
        
    } catch (error) {
        return res.sendError(400,"Error in isLoggedIn Middleware",error.message)
    }
}


export default isLoggedIn