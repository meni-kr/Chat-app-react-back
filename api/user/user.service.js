import { User } from "../../models/User.model.js";

export const userService = {
    updateUser
}

async function updateUser(userId, fieldsToUpdate) {
    const { firstName, lastName } = fieldsToUpdate
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            profileSetup: true,
        }, {
            new: true,
            runValidators: true,
        })
        return updatedUser
    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}