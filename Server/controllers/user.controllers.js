import emailValidator from 'email-validator'
import userModel from '../models/user.model.js'
import sendResetEmail from '../utils/sendEmail.util.js'
import cloudinary from 'cloudinary'
import fs from 'fs'


const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true
}

const register = async (req, res, next) => {

    const { fullName, email, password } = req.body

    //any field is empty 
    if (!fullName || !email || !password) {
        return res.sendError(400, "Every Field is Required!")
    }

    //email is not in valid formate
    const isValidEmail = emailValidator.validate(email)

    if (!isValidEmail) {
        return res.sendError(400, "Please Enter Valid Email Address")
    }


    try {
        //email already exists
        const user = await userModel.findOne({ email })
        if (user) {
            return res.sendError(400, "Email Already Exists!", email)
        }

        //now we have new user
        const newUser = await userModel.create({
            fullName,
            email,
            password
        })


        console.log("req.file :", req.file)
        if (req.file) {

            // Upload the profile to Cloudinary File Storage Server
            const uploadProfilePicture = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'Profile Picture',
                transformation: [
                    {
                        width: 200,
                        height: 200,
                        gravity: 'face',
                        crop: 'fill',
                    }
                ],
                context: { alt: "Profile Picture" }
            }, (err, result) => {
                if (err) {
                    return res.sendError(501, "Error in Uploading Profile to Cloudinary")
                } else {
                    console.log("Profile Successfully uploaded to Cloudinary")
                }
            })

            if (uploadProfilePicture) {
                //after uploading profile picture store the information in user database
                newUser.avatar.public_id = uploadProfilePicture.public_id
                newUser.avatar.secure_url = uploadProfilePicture.secure_url
                await newUser.save()

                //Delete file from local storage
                fs.rmSync(req.file.path)
                console.log("Removed Profile Picture From Local Storage")
            }

            //user createed Successfully
            res.success(200, "Successfully Registered", newUser)

        } else {
            console.log("Registed Without Profile Picture")
            return res.success(200, "Successfully Registered", newUser)
        }

    } catch (error) {
        res.sendError(400, "Error in Register", error.message)
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    //email or password is missing 
    if (!email || !password) {
        return res.sendError(400, "Missing Email or Password")
    }

    try {
        //  doesn't exist with this email
        const User = await userModel.findOne({ email }).select('+password')
        if (!User) {
            return res.sendError("Email is Not Registered")
        }

        // if Password Doesn't Match
        const isValidPassword = await User.comparePassword(password)

        if (!isValidPassword) {
            return res.sendError(400, "Invalid Credentials")
        }

        // if password is correct

        if (isValidPassword) {
            // We will set the cookie for the user so that he/she can stay login

            const userToken = User.generateJwtToken()

            res.cookie("token", userToken, cookieOptions)

            return res.success(200, "LoggedIn Successfully", User)
        }

    } catch (error) {
        return res.sendError(400, "Error in Loggedin", error.message)
    }
}

const getProfile = (req, res, next) => {
    // we can get the profile if use is logged in , if use is logged in req.user will have all his details

    try {
        const userDetails = req.user

        if (!userDetails) {
            res.sendError(401, "Unautherised User")
        }

        if (userDetails) {
            res.success(200, "Get Profile Successfully", userDetails)
        }

    } catch (error) {
        res.sendError(401, "Error Getting User Profile", error.message)
    }
}

const updateProfile = (req, res, next) => {
    // I can update the Profile Picture and profile Information as well
}

const logout = (req, res, next) => {
    // We can just delete the cookie to logout the user or assign an empty token which have expired in privious date
    try {
        res.cookie("token", "", { maxAge: 0, httpOnly: true })
        return res.success(200, "Logout Successfully")
    } catch (error) {
        res.sendError(400, "Error in Logout", error.message)
    }
}

const updatePassword = async (req, res, next) => {

    try {
        // to change the password user must be logged in, if user is loggedin, body.user will have it's information
        const userId = req.user.id

        const User = await userModel.findById(userId).select('+password')

        if (!User) {
            return res.sendError('401', "Please LoggedIn to Update Password")
        }

        // Now User is loggedin and is a Valid User, We will ask for Current Password and newPassword

        const { currPassword, newPassword } = req.body

        // Current Password is Incorrect
        const isValidPassword = await User.comparePassword(currPassword)

        if (!isValidPassword) {
            return res.sendError(400, "Invalid Current Password")
        }

        if (isValidPassword) {
            User.password = newPassword

            //Save the Updated Information
            await User.save()

            User.password = undefined

            res.success(200, "Password Updated Successfully", { id: User.id, fullName: User.fullName })
        }

    } catch (error) {
        res.sendError(400, "Error in Updating Password", error.message)
    }
}

const forgetPassword = async (req, res, next) => {

    const { email } = req.body

    //email field is empty
    if (!email) {
        return res.sendError(400, "Email Field is Required")
    }

    try {
        //user doesn't exist with this email
        const User = await userModel.findOne({ email })

        //Note: find function will return empty array, if 
        if (!User) {
            return res.sendError(400, "No Account Exists with This Email")
        }


        // now generate token which can only be use in 5mins and Send a mail with Link Containting Token

        const token = await User.resetPasswordToken()

        await sendResetEmail(User._id, User.email, token)

        res.success(200, "Email Successfully Send", { fullName: User.fullName, email: User.email })

    } catch (error) {
        User.forgetPasswordToken = undefined
        User.forgetPasswordExpiry = undefined
        User.save()
        res.sendError(400, "Error in Sending Email", error.message)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        //fetch the userId and token from url
        const { userId, token } = req.params

        // fetch newPassword from body
        const { newPassword } = req.body

        //check if any user exist with this token

        const User = await userModel.findById(userId).select('+password')

        if (!User) {
            return res.sendError(400, "User Does Not Exist!")
        }

        //Verify the token, and Check it's expiry data
        const isValidToken = await User.validateToken(token)
        if (isValidToken) {
            User.password = newPassword
            await User.save()

            res.success(200, "Password Reset Successfully", User.email)

            // AS Password is Reset, so we will Remove the forgetPassword token and expiry

            User.forgetPasswordExpiry = new Date(0)
            User.forgetPasswordToken = ""
            await User.save()
        } else {
            res.sendError(400, "Token is Expired Please Try Again")
        }

    } catch (error) {
        res.sendError(500, "Error in Reset Password", error.message)
    }
}



export {
    register,
    login,
    getProfile,
    logout,
    updatePassword,
    forgetPassword,
    resetPassword
}