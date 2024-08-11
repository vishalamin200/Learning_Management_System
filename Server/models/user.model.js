import bcrypt from 'bcrypt';
import crypto from 'crypto';
import JWT from 'jsonwebtoken';
import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        minlengh: [2, "Name is too short"],
        maxlength: [30, "Name is too long"],
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, "Enter valid Email"]
    },
    password: {
        type: String,
        minlength: [6, "Password should have atleast 6 characters"],
        require: true,
        select: false
    },

    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: "USER"
    },

    avatar: {
        public_id: {
            type: String,
            default: "Profile Picture/biyplutpufll4m9ulds6"
        },
        secure_url: {
            type: String,
            default: "https://res.cloudinary.com/dqtkulbwd/image/upload/v1721809315/Profile%20Picture/biyplutpufll4m9ulds6.jpg"
        }
    },

    subscription: {
        id: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: "Inactive"
        }
    },

    forgetPasswordToken: String,

    forgetPasswordExpiry: Date

}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    // if password is not modified and have same as previous don't encryt it again
    if (!this.isModified('password')) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()

    } catch (error) {
        console.error("Error in Encrypting the password : ", error.message)
        next(error)
    }
})

userSchema.methods = {
    async comparePassword(textPassword) {
        try {
            let result = await bcrypt.compare(textPassword, this.password)
            return result
        } catch (error) {
            console.error("Error In Comparing Paswords: ", error.message)
        }
    },

    generateJwtToken() {
        return JWT.sign({ id: this._id, fullName: this.fullName, email: this.email, role: this.role, subscription: this.subscription },
            process.env.JWT_SECRET_KEY,
            {
                // algorithm:'RS256',
                expiresIn: '2 days'
            }
        )
    },

    async resetPasswordToken() {
        try {
            const token = crypto.randomBytes(32).toString('hex')

            // Encrypt the token and store this token inside the user's database for later use
            const salt = await bcrypt.genSalt(10)
            this.forgetPasswordToken = await bcrypt.hash(token, salt)
            this.forgetPasswordExpiry = new Date(Date.now() + 5 * 60 * 1000)

            //Save all information we updated
            await this.save()

            //return the token we have generate
            return token;

        } catch (error) {
            console.error("Error in Generating Reset Password Token")
            throw error
        }
    },

    async validateToken(token) {
        try {
            // As token inside the databased is encrypted so we will encrypt the token and then find the correspoding user docuemts
            const isValidToken = await bcrypt.compare(token, this.forgetPasswordToken)
            const isTokenExpired = this.forgetPasswordExpiry > Date.now()

            return (isValidToken && isTokenExpired)

        } catch (error) {
            console.error("Error in Validating the Reset Password Token", error.message)
        }
    }
}



const userModel = mongoose.model('users', userSchema)

export default userModel


