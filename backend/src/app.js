import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();

const corsConfig = {
    origin: process.env.CORS_ORIGIN,
    Credential: true
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsConfig))
app.use(cookieParser())


import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/admins', adminRoutes)


export default app