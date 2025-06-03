import mongoose, { model, Schema } from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, "Enter valid Email"]
    },
    phone: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})


const contactModel = mongoose.model('Contacts', contactSchema)
export default contactModel