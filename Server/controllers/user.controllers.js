import cloudinary from 'cloudinary'
import emailValidator from 'email-validator'
import fs from 'fs'
import userModel from '../models/user.model.js'
import sendResetEmail from '../utils/sendEmail.util.js'


const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'None',
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

    if (password.length < 6) {
        return res.sendError(400, "Password Must Be Atleast 6 Character Long")
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
                }
            })

            if (uploadProfilePicture) {
                //after uploading profile picture store the information in user database
                newUser.avatar.public_id = uploadProfilePicture.public_id
                newUser.avatar.secure_url = uploadProfilePicture.secure_url
                await newUser.save()

                //Delete file from local storage
                fs.rmSync(req.file.path)
            }

            const userInfo = newUser.toObject()
            const { password, ...userWithoutPassword } = userInfo

            //user createed Successfully
            res.success(200, "Account Created Successfully", { User: userWithoutPassword })

        } else {

            //Remove the Password before sending User information to client
            const userInfo = newUser.toObject()
            const { password, ...userWithoutPassword } = userInfo

            return res.success(200, "Account Created Successfully", { User: userWithoutPassword })
        }

    } catch (error) {
        res.sendError(400, "Error In Register", error.message)
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
            return res.sendError(400, "Email is Not Registered")
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

            const UserObj = User.toObject()
            const { password, ...userWithoutPassword } = UserObj

            return res.success(200, "LoggedIn Successfully", userWithoutPassword)
        }

    } catch (error) {
        return res.sendError(400, "Error in Loggedin", error.message)
    }
}

const getProfile = async (req, res, next) => {
    // we can get the profile if use is logged in , if use is logged in req.user will have all his details

    try {
        const userId = req?.user?.id

        const userDetails = await userModel.findById(userId)

        if (!userDetails) {
            res.sendError(401, "Unautherised User")
        }

        const { createdCourses, subscriptions, ...filteredUser } = userDetails.toObject()

        if (filteredUser) {
            res.success(200, "Get Profile Successfully", filteredUser)
        }

    } catch (error) {
        res.sendError(401, "Error Getting User Profile", error.name)
    }
}

const editProfile = async (req, res, next) => {

    // if user is logged in we will get his userId,
    try {
        const userId = req.user.id
        const { fullName, contact, linkedin, address, removeProfile } = req.body

        if (fullName.length < 3) {
            return res.sendError(400, "Name Is Too Short")
        }

        const User = await userModel.findByIdAndUpdate(userId, { fullName, contact, linkedin, address }, { new: true })
        if (!User) {
            return res.sendError(400, "Please Logged In Again, And Try", User)
        }

        if (removeProfile === 'true') {

            // remove profile picture from cloudinary
            const avatar_public_id = User?.avatar?.public_id
            if (avatar_public_id) {
                const response = await cloudinary.v2.uploader.destroy(avatar_public_id)
                if (response.result == 'ok') {
                    // console.log('Profile picture removed from cloudinary')
                } else {
                    // console.log('Profile picture does not exists in cloudinary')
                }
            }

            // remove public id and set secure_url as url of default profile picture
            User.avatar.public_id = ""
            User.avatar.secure_url = "https://res.cloudinary.com/dqtkulbwd/image/upload/v1723902171/Profile%20Picture/accfigp4wynlmdz9zajd.webp"

            await User.save()
        }

        if (req.file && req.file != 'undefined') {
            // User want to change the avatar as well,
            // so first we will remove the avatar from Cloudinary, and then we will upload the new avatar to cloudinary

            try {

                if (User?.avatar?.public_id) {
                    const response = await cloudinary.v2.uploader.destroy(User?.avatar?.public_id)
                    if (response.result == 'ok') {
                        // console.log("Removed Old Profile Picture From Cloudinary")
                    } else {
                        // console.log("Old Profile Does Not exists in Cloudinary")
                    }
                }

                // Upload new Profile Picture
                try {
                    const response = await cloudinary.v2.uploader.upload(req.file.path, {
                        folder: "Profile Picture",
                        transformation: [
                            {
                                width: 200,
                                height: 200,
                                gravity: 'face',
                                crop: 'fill'
                            }
                        ],
                        context: { alt: "Profile Picture" }
                    })

                    if (response.public_id) {
                        // console.log("New Profile Uploaded to Cloudinary")

                        // set new Public_Id and Secure_url

                        User.avatar.public_id = response.public_id
                        User.avatar.secure_url = response.secure_url


                    } else {
                        return res.sendError(501, "Error In Updating New Profile Picture, Please Try Again")
                    }

                } catch (error) {
                    return res.sendError(501, "Error In Uploading New Profile Picture", error.message)
                }

                await User.save()

                const UserObj = User.toObject()
                const { password, ...UserWithoutPassword } = UserObj

                return res.success(200, "Profile Updated Successfully", {
                    User: UserWithoutPassword
                })

            } catch (error) {
                return res.sendError(400, "Error in Uploading Profile Picture", error.message)
            }
        } else {
            try {
                await User.save()

                const UserObj = User.toObject()
                const { password, ...UserWithoutPassword } = UserObj

                return res.success(200, "Profile Updated Successfully", {
                    Remark: 'Profile Picture is Not Changed', User: UserWithoutPassword
                })
            } catch (error) {
                return res.sendError(400, "Error In Updating Profile", error.message)
            }
        }
    } catch (error) {
        return res.sendError(400, "Error In Edit Profile", error.message)
    }
}

const logout = (req, res, next) => {
    // We can just delete the cookie to logout the user or assign an empty token which have expired in privious date

    try {
        res.cookie("token", "", cookieOptions)
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

    //user doesn't exist with this email
    const User = await userModel.findOne({ email })

    //Note: find function will return empty array, if 
    if (!User) {
        return res.sendError(400, "No Account Exists with This Email")
    }

    try {
        // now generate token which can only be use in 5mins and Send a mail with Link Containting Token

        const token = await User.resetPasswordToken()

        await sendResetEmail(User._id, User.email, User.fullName, token)

        res.success(200, "Email Send Successfully", { fullName: User.fullName, email: User.email })

    } catch (error) {
        // console.log("Error :" ,error)
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

const deleteAccount = async (req, res) => {
    // delete the profile picture from cloudinary, delete it's account from mongo

    try {

        if (!req.user) {
            return res.sendError(401, "Please Logged In Again And Try")
        }
        const userId = req.user.id

        const User = await userModel.findById(userId)
        if (!User) {
            return res.sendError(401, "User Doesn't Exist!")
        }
        if (User.role === 'ADMIN') {
            return res.sendError(400, "Admin Can't Delete Their Account")
        }


        const public_id = User?.avatar?.public_id

        if (public_id) {
            // Now Delete the User Profile from Cloudinary

            const response = await cloudinary.v2.uploader.destroy(public_id)
            if (response.result == 'ok') {
                // console.log("Profile Picture Deleted From Cloudinary")
            } else {
                // console.log("Profile Picture Doesn't Exits in Cloudinary")
            }
        }

        try {
            const deletedUser = await userModel.findByIdAndDelete(userId)
            if (!deletedUser) {
                return res.sendError(401, "User Doesn't Exists!")
            }

            res.cookie("token", "", cookieOptions)
            return res.success(200, "Account Deleted Successfully")
        } catch (error) {
            return res.sendError(501, "Error In Deleting Account", error.message)
        }
    } catch (error) {
        return res.sendError(400, "Error In Delete Account", error.message)
    }
}

const fetchStudentsAndInstructors = async (req, res) => {
    try {
        const userRole = req?.user?.role

        if (userRole != 'ADMIN' && userRole != 'INSTRUCTOR') {
            return res.sendError(400, 'Unauthorized')
        }

        const students = await userModel.find({ role: 'USER' })
        const instructors = await userModel.find({ role: 'INSTRUCTOR' }).populate('createdCourses.courseId')
        return res.success(200, 'Students Fetch Successfully', { students, instructors })

    } catch (error) {
        return res.sendError(400, "Error In Fetching Students and Instructors", error.message)
    }
}

const deleteUserOrInstructor = async (req, res) => {
    try {
        if (req?.user?.role !== 'ADMIN') {
            return res.sendError(401, "Unauthorized")
        }

        const { userId } = req.body

        if (!userId) {
            return res.sendError(400, "UserId Is Missing")
        }

        const user = await userModel.findById(userId)
        if (!user) {
            return res.sendError(401, "User Doesn't Exist!")
        }

        const public_id = user?.avatar?.public_id

        if (public_id) {
            // Now Delete the User Profile from Cloudinary

            const response = await cloudinary.v2.uploader.destroy(public_id)
            if (response.result == 'ok') {
                // console.log("Profile Picture Deleted From Cloudinary")
            } else {
                // console.log("Profile Picture Doesn't Exits in Cloudinary")
            }
        }

        try {
            const deletedUser = await userModel.findByIdAndDelete(userId)
            if (!deletedUser) {
                return res.sendError(401, "User Doesn't Exists!")
            }
            return res.success(200, "Account Suspended Successfully")
        } catch (error) {
            return res.sendError(501, "Error In Deleting Account", error.message)
        }
    } catch (error) {
        return res.sendError(400, "Error In Delete Account", error.message)
    }
}


export { deleteAccount, deleteUserOrInstructor, editProfile, fetchStudentsAndInstructors, forgetPassword, getProfile, login, logout, register, resetPassword, updatePassword }

