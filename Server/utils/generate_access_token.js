// generateAuthUrl.js
import {google} from 'googleapis'
import dotenv from 'dotenv'
//dotenv file configure
dotenv.config()


// Replace with your values or load from .env

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_YOUTUBE_CLIENT_ID,
    process.env.GOOGLE_YOUTUBE_CLIENT_SECRET,
    process.env.GOOGLE_YOUTUBE_REDIRECT_URI,
);

// Generate the URL
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // important to get refresh_token
    scope: [
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtube.force-ssl'
    ],
    prompt: 'consent', // force asking again to get refresh_token
});

console.log('\n🔗 Visit this URL to authorize:\n');
console.log(authUrl);
