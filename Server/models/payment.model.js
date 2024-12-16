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
    timestamps: true,
    autoIndex:false,
})

const paymentModel = model("Payments", paymentSchema)

async function getIndexes() {
    try {
        // Step 1: Get existing indexes
        const indexes = await paymentModel.collection.indexes();
        // console.log("paymentModel Indexes:", indexes);

    } catch (error) {
        console.error("Error In paymentModel Indexes:", error.message);
    }
}

// getIndexes();

export default paymentModel;