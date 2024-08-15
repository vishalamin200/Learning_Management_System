import app from './app.js'
import cloudinary from 'cloudinary'
import Razorpay from 'razorpay';
const PORT = process.env.PORT
import https from 'https'
import fs from 'fs'
import path from 'path';


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

// create a https server using https

const privateKey = fs.readFileSync('C:/Users/Vishal/OneDrive/Learning_Management_System/Server/server.key','utf-8')
const certificate = fs.readFileSync('C:/Users/Vishal/OneDrive/Learning_Management_System/Server/server.cert','utf-8')


const credentials = { key: privateKey , cert:certificate}
const httpsServer = https.createServer(credentials,app)


httpsServer.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`)
})