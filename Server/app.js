import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectMongo from './config/connectMongo.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import successMiddleware from './middlewares/success.middleware.js'
import errorMiddleware from './middlewares/error.middleware.js'
import courseRouter from './routes/course.routes.js'
 

const app = express()

//dotenv file configure
dotenv.config()

//database connetion
connectMongo()

origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
}

//Middlewares
const allowedOrigins = process.env.ALLOWED_ORIGINS


const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },

    methods:['POST','GET','PUT','DELETE','PATCH'],
    credentials:true
}
app.use(cors(corsOptions))



app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser())

app.use(successMiddleware)
app.use(errorMiddleware) 


//redirects and 
app.use('/api/auth/',userRouter)

app.use('/user/vi/course/',courseRouter)

app.use('/user/vi/payment/',paymentRoutes)


// Ping Pong
app.get('/ping',(req,res)=>{
    res.send("Pong")
})

//for Misscallenous Pages Access
app.get('*',(req,res)=>{
    res.send("Error 404: Page Doesn't Exist")
})

export default app


