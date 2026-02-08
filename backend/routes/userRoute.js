import express from 'express'
import {checkLogin, loginUser,signupUser} from '../controllers/authController.js'

const userRouter=express.Router()
userRouter.post('/login',loginUser)
userRouter.post('/signup',signupUser)
userRouter.get('/checklogin',checkLogin)

export default userRouter