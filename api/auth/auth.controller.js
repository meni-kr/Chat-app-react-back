import { User } from "../../models/User.model.js"
import bcrypt, { compare } from "bcrypt"
import { generateTokenAndSetCookie, generateVerificationToken } from "../../services/utils.service.js"

export async function signup(req, res) {
    const { email, password, nickName } = req.body

    try {
        if (!email || !password || !nickName) {
            return res.status(400).json({ success: false, message: "All fields are required!" })
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
            nickName,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })

        await user.save()

        generateTokenAndSetCookie(res, user._id)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: null,
            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export async function login(req, res) {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            throw new Error("All fields are required!")
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User dos not exists" })
        }

        const auth = await compare(password,user.password)
        if(!auth){
            return res.status(400).json({ success: false, message: "Password is incorrect!" })
        }
        generateTokenAndSetCookie(res, user._id)
        res.status(200).json({
            success: true,
            message: "User login successfully",
            user: {
                ...user._doc,
                password: null,
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const logout = async (req, res) => {
    res.send("logout route")
}