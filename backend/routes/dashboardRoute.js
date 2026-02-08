import express from 'express'
import authUser from '../middleware/authUser.js'
import { dashboard } from '../controllers/dashboardController.js'

const dashboardRouter=express.Router()
dashboardRouter.post('/',authUser,dashboard)

export default dashboardRouter