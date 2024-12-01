import express from 'express'
import { updateUser } from './user.controller.js'
import { verifyToken } from '../../middlewares/Auth.middleware.js'

const router = express.Router()

router.put('/updateUser', verifyToken, updateUser)


export default router