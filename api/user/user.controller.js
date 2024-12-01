import { User } from "../../models/User.model.js"
import { userService } from "./user.service.js"


export async function updateUser(req, res) {
    try {
        const { userId } = req
        const { firstName, lastName, color } = req.body
        if (!firstName || !lastName ) return res.status(400).send({ success: false, message: "FirstName lastName and color are required" })

        const updatedUser = await userService.updateUser(userId,{firstName,lastName,color})

            res.status(200).json({
                success: true,
                message: "User update successfully",
                user: {
                    ...updatedUser._doc,
                    password: null,
                }
            })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}