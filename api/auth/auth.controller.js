import { User } from "../../models/User.model.js"
import bcrypt from "bcrypt"
import { generateTokenAndSetCookie, generateVerificationToken } from "../../services/utils.service.js"

export async function signup(req, res) {
    console.log('req.body: ',req.body);

    const { email, password, name } = req.body

    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required!")
        }
        const userAlreadyExists = await User.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = generateVerificationToken()
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })
        await user.save()

        generateTokenAndSetCookie(res, user._id)
        console.log('user res:',user)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: null,
            }
        })

    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    res.send("login route")
}

export const logout = async (req, res) => {
    res.send("logout route")
}