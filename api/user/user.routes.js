import express from 'express'
import { getUser } from './user.controller.js'
import { verifyToken } from '../../middlewares/Auth.middleware.js'

const router = express.Router()



export default router