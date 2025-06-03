import verifyCaptcha from "../utils/verifyCaptcha.js"
import contactModel from "../models/contact.model.js"
import sendContactMail from "../utils/sendContactMail.js"


const sendUsMessage = async (req, res) => {
    try {

        // check all field are present
        for (const [key, value] of Object.entries(req.body)) {
            if (!value) {
                return res.sendError(400, `${key} is missing`, "All Fields Are Required")
            }
        }

        const {name,email,phone,subject,message, captchaToken} = req.body

        // validate email, phone
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        const phoneRegex = /^[6-9]\d{9}$/;

        if(!emailRegex.test(email)){
            return res.sendError(400,"Email Is Not Valid Email", "Invalid Email Formate")
        }

        if(!phoneRegex.test(phone)){
            return res.sendError(400,"Provide Valid 10 digit Indian Phone Number", "Invalid Phone Number")
        }

        const isHuman = await verifyCaptcha(captchaToken)

        //validate the captcha
        if (!isHuman) {
            return res.sendError(400, "CAPTCHA Validation Failed!", "Failed Captcha validation")
        }


        // store msg in db
        await contactModel.create(req.body)

        // send email to admin
        const emailRes = await sendContactMail({name,email,phone,subject,message})
        if(emailRes.success){
            console.log("email send successfully to contact mail")
        }

        return res.success(200,"We have received your message", "message received successfully")

    } catch (error) {
        return res.sendError(400, "Error in sendUsMessage controller", error.message)
    }
}


export { sendUsMessage }
