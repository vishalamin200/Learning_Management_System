import { configDotenv } from 'dotenv';
import fs from 'fs';
import path from 'path';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import { fileURLToPath } from 'url';

// Load environment variables from .env
configDotenv();

// Derive __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a client for Brevo (Sendinblue)
const client = () => {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    return new SibApiV3Sdk.TransactionalEmailsApi();
}

// Function to get and customize the HTML email content
function getHtmlContent(userName, resetLink) {
    const filePath = path.join(__dirname, 'passwordReset.html');
    let htmlContent = fs.readFileSync(filePath, 'utf8');

    // Replace placeholders in the HTML content
    htmlContent = htmlContent.replace('[User]', userName)
        .replace('[reset_link]', resetLink);

    return htmlContent;
}

// Function to send the password reset email using Brevo
const sendResetEmailByBrevo = (userId, userEmail, userName, token) => {
    const resetPasswordLink = `${process.env.CLIENT_URL}/auth/resetPassword/${userId}/${token}`;
    const htmlContent = getHtmlContent(userName, resetPasswordLink);

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // Correct capitalization of the class name

    sendSmtpEmail.subject = "RESET YOUR PASSWORD";
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { name: 'CodeAcademy', email: process.env.SENDER_EMAIL };
    sendSmtpEmail.to = [{ email: userEmail }];
    sendSmtpEmail.replyTo = { email: process.env.SENDER_EMAIL };
    sendSmtpEmail.headers = { "charset": "utf-8" };

    // Call the client and send the email
    client().sendTransacEmail(sendSmtpEmail) // Invoke the client function
        .then(data => console.log('Email sent successfully:', data))
        .catch(error => console.error('Error sending email:', error));
}

export default sendResetEmailByBrevo;
