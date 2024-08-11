import app from './app.js'
import cloudinary from 'cloudinary'
import Razorpay from 'razorpay';
const PORT = process.env.PORT


//configure the cloudinary 

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//configure the Razorpay 
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})