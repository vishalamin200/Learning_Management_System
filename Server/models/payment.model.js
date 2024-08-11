import { Schema, model } from "mongoose";


const paymentSchema = new Schema({
    payment_id: {
        type: String,
        required: [true, "Payment Id Required"]
    },
    subscription_id: {
        type: String,
        required: [true, "Subscription Id Requited"]
    },

    signature: {
        type: String,
        required: [true, "Signature Required"]
    }
}, {
    timestamps: true
})

const paymentModel = model("Payments", paymentSchema)

export default paymentModel;