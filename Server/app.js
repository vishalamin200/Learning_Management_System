import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import connectMongo from './config/connectMongo.js'
import passport from './config/passport.config.js'
import courseRouter from './routes/course.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import userRouter from './routes/user.routes.js'
import errorUtilityFunc from './utils/error.util.js'
import successUtilityFunc from './utils/success.util.js'

import authRoutes from './routes/auth.routes.js'


const app = express()

//dotenv file configure
dotenv.config()

//database connetion
connectMongo()


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

    methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}

app.use(cors(corsOptions))


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

app.use(successUtilityFunc)
app.use(errorUtilityFunc)

//Oauth Middlewares for googleAuth

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())



//redirects and routes

app.use('/auth', authRoutes)

app.use('/user/auth/', userRouter)

app.use('/user/course/', courseRouter)

app.use('/user/payment/', paymentRoutes)


// Ping Pong
app.get('/ping', (req, res) => {
    res.send("Pong")
})

//for Misscallenous Pages Access
app.get('*', (req, res) => {
    res.send("Error 404: Page Doesn't Exist")
})

export default app


