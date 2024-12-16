import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Derive __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read HTML file and replace placeholders
function getHtmlContent(userName, resetLink) {
    const filePath = path.join(__dirname, 'passwordReset.html');
    let htmlContent = fs.readFileSync(filePath, 'utf8');
    
    htmlContent = htmlContent.replace('[User]', userName)
                             .replace('[reset_link]', resetLink);
    
    return htmlContent;
}

// Configure Nodemailer to use Gmail SMTP server
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.SENDER_EMAIL, // Your Gmail address
        pass: process.env.SENDER_EMAIL_PASSWORD, // Your Gmail password or App Password
    },
});

// Function to send reset email
function sendResetEmail(userId, userEmail,userName, token) {

    try {
        const resetPasswordLink = `${process.env.CLIENT_URL}/resetPassword/${userId}/${token}`;
        const htmlContent = getHtmlContent(userName, resetPasswordLink);
    
        transporter.sendMail({
            from: process.env.SENDER_EMAIL, // Sender Email
            to: userEmail,
            subject: "RESET YOUR PASSWORD",
            text: "",
            html: htmlContent,
        }, (error, info) => {
            if (error) {
                return console.error("Error sending email:", error);
            }
            // console.log("Email sent:", info.response);
        });
        
    } catch (error) {
        // console.log("Error in Sending Mail", error.message)   
    }

}


export default sendResetEmail;
