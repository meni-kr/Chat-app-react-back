import { User } from "../../models/User.model.js"
import{unlinkSync}from "fs"


export const userService = {
    updateUser,
    updateProfileImage,
    removeProfileImage
}

async function updateUser(userId, fieldsToUpdate, res) {
    const { firstName, lastName, color } = fieldsToUpdate
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            color,
            profileSetup: true,
        }, {
            new: true,
            runValidators: true,
        })
        updatedUser.password = null
        return updatedUser
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

async function updateProfileImage(userId, image, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            profileImage:image.profileImage
        }, {
            new: true,
            runValidators: true,
        })
        updatedUser.password = null
        
        return updatedUser
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }

}

async function removeProfileImage(userId,res) {
try {
    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({ success: false, message: "User not found" })
    }
    if(user.profileImage){
        unlinkSync(user.profileImage)
    }
    user.profileImage = null
    await user.save()
    return user

} catch (error) {
    res.status(404).json({ success: false, message: error.message })
}
}