import { config } from "dotenv"
import axios from 'axios'

config()

const verifyCaptcha = async (token)=>{

    const secretKey = process.env.CAPTCHA_SECRET_KEY
    const url = `https://www.google.com/recaptcha/api/siteverify`;

    try {
        const res = await axios.post(url,null,{
            params:{
                secret: secretKey,
                response: token
            }
        })
        
        return res?.data?.success
        
    } catch (error) {
        console.log("Error in verifying Captcha", error.message)
        throw new Error(error.message)
    }
}

export default verifyCaptcha