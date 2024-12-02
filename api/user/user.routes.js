import express from 'express'
import { updateUser,updateProfileImage,removeProfileImage } from './user.controller.js'
import { verifyToken } from '../../middlewares/Auth.middleware.js'
import multer from 'multer'

const router = express.Router()

const upload = multer({dest:"uploads/profiles/"})

router.put('/updateUser', verifyToken, updateUser)
router.put('/updateProfileImage', verifyToken,upload.single("profile-image"), updateProfileImage)
router.delete("/removeProfileImage", verifyToken,removeProfileImage)


export default router