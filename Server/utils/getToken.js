import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_YOUTUBE_CLIENT_ID,
    process.env.GOOGLE_YOUTUBE_CLIENT_SECRET,
    process.env.GOOGLE_YOUTUBE_REDIRECT_URI,
);

async function getTokens(code) {
    try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log('Access Token:', tokens.access_token);
        console.log('Refresh Token:', tokens.refresh_token);
        // Save tokens.refresh_token securely for later use
    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
    }
}

// Paste your extracted code here
const codeFromRedirect = '4/0AUJR-x4hDB219symxuKZIFVEZT6IY0tnPeietAMLGf85F31fmJg-slD-_bWYw0l8PPbl1g';

getTokens(codeFromRedirect);
