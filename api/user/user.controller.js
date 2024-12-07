import { userService } from "./user.service.js"
import{ renameSync}from "fs"


export async function updateUser(req, res) {
    try {
        const { userId } = req
        const { firstName, lastName, color } = req.body
        if (!firstName || !lastName) return res.status(400).send({ success: false, message: "FirstName lastName and color are required" })

        const updatedUser = await userService.updateUser(userId, { firstName, lastName, color },res)

        res.status(200).json({
            success: true,
            message: "User update successfully",
            updatedUser
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export async function updateProfileImage(req, res) {
    try {
        if (!req.file) res.status(400).send("file is required")

        const date = Date.now()

        let fileName = "uploads/profiles/" + date + req.file.originalname
        renameSync(req.file.path,fileName)
        
        const updatedUser = await userService.updateProfileImage(req.userId, { profileImage: fileName },res)
        res.status(200).json({
            success: true,
            message: "Profile image updated successfully",
            updatedUser
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export async function removeProfileImage(req, res) {
    try {
        const updatedUser = await userService.removeProfileImage(req.userId,res)
        res.status(200).json({
            success: true,
            message: "Profile image removed successfully",
            updatedUser
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export async function getContacts(req,res){
        try {
            const {term} = req.params
            if(term === undefined || term === null){
                return res.status(400).json({ success: false, message: "Search Term is required" })
            }
            const sanitizedSearchTerm = term.replace(/[^a-zA-Z0-9\s]/g, '')
            const regex = new RegExp(sanitizedSearchTerm, 'i')
            const contacts = await userService.getContacts(regex, req.userId, res)

            res.status(200).json({
                success: true,
                message: "get contacts successfully",
                contacts
            })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
}