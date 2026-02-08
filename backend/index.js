import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js';
import cors from 'cors'
import userRouter from './routes/userRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
connectDB()
app.use(express.json())
// app.get('/',(req, res)=>{
//     res.send('Server is running')
// })
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
}))
app.use('/api/users',userRouter)
app.use('/api/dashboard',dashboardRouter)
app.listen(PORT,()=>{
    console.log('Server running on port'+PORT)
})