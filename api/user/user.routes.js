import express from 'express'
import { updateUser, updateProfileImage, removeProfileImage, getContacts } from './user.controller.js'
import { verifyToken } from '../../middlewares/Auth.middleware.js'
import multer from 'multer'

const router = express.Router()

const upload = multer({ dest: "uploads/profiles/" })

router.put('/updateUser', verifyToken, updateUser)
router.put('/updateProfileImage', verifyToken, upload.single("profile-image"), updateProfileImage)
router.delete("/removeProfileImage", verifyToken, removeProfileImage)
router.get("/getContacts/:term", verifyToken, getContacts)


export default router