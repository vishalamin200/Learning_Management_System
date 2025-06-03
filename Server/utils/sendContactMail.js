import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname =  path.dirname(__filename)

function getContactMailHTML({name,email,phone,subject,message}){
    const filePath = path.join(__dirname,"contactMail.html")

    let html = fs.readFileSync(filePath,'utf-8')

    return html
        .replace('[UserName]', name)
        .replace('[UserEmail]', email)
        .replace('[UserPhone]', phone)
        .replace('[UserSubject]', subject)
        .replace('[UserMessage]', message);
}


const sendContactMail = async ({name,email,phone,subject,message}) =>{
    try {
        const transporter = nodemailer.createTransport({
            host:'smtp.zoho.in',
            port:465,
            secure:true,
            auth:{
                user: process.env.CONTACT_SENDER_EMAIL,
                pass: process.env.CONTACT_SENDER_PASSWORD
            }
        })

        const mailOptions = {
            from: `"${name}" <${process.env.CONTACT_SENDER_EMAIL}`,
            to: process.env.ADMIN_EMAIL ,
            subject: `${subject}`,
            html: getContactMailHTML({name,email,phone,subject,message})
        }
        
        const info = await transporter.sendMail(mailOptions)

        return {success:true, response:info.response}
    } catch (error) {
        console.log("Error in sending the contact email ", error.message)
        throw new Error(error)
        
    }
}

export default sendContactMail