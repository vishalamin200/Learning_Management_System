import dotenv from 'dotenv'
import fs from 'fs'
import { google } from 'googleapis'

dotenv.config()

// authenticate yourself before proceed to user the google's youtube function.

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_YOUTUBE_CLIENT_ID,
    process.env.GOOGLE_YOUTUBE_CLIENT_SECRET,
    process.env.GOOGLE_YOUTUBE_REDIRECT_URI,
)

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_YOUTUBE_REFRESH_TOKEN
})

// after authentication, create a youtube client 
const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client
})

// now add, update or delete videos using this youtube client.

async function uploadToYoutube(filePath, title = "Lecture Video", description = "") {
    try {
        const response = await youtube.videos.insert({
            part: 'snippet,status',

            requestBody: {

                snippet: {
                    title,
                    description,
                },
                status: {
                    privacyStatus: 'unlisted',
                }
            },
            media: {
                body: fs.createReadStream(filePath)
            }
        })

        const videoId = response.data.id

        return {
            public_id: videoId,
            secure_url: `https://www.youtube.com/watch?v=${videoId}`
        }

    } catch (error) {
        console.error("Error in video upload to youtube", JSON.stringify(error.response.data))
        throw error
    }
}


async function deleteVideoFromYoutube(videoId) {
    try {
        const response = await youtube.videos.delete({
            id: videoId
        })
    } catch (error) {
        throw error
    }
}


async function updateVideoTitleFromYoutube(videoId, newTitle) {
    try {
        const { data } = await youtube.videos.list({
            part: 'snippet',
            id: videoId
        })

        if (!data?.items || data?.items?.length == 0) {
            throw new Error("Video not found with this videoId")
        }

        const video = data.items[0]

        if (video.snippet.title === newTitle.trim()){
            return 
        }

        video.snippet.title = newTitle

        const response = await youtube.videos.update({
            part: 'snippet',
            requestBody: {
                id: videoId,
                snippet: video.snippet,
            }
        })

    } catch (error) {
        throw error
    }
}

export { deleteVideoFromYoutube, updateVideoTitleFromYoutube, uploadToYoutube }
