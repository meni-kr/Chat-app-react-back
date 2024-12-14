import { User } from "../../models/User.model.js"
import bcrypt, { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { clearCookie, generateTokenAndSetCookie } from "../../services/utils.service.js"


export const authService = {
    signUp,
    login,
    logOut,
    validateToken
}

async function signUp(user, res) {
    const { email, password, nickName } = user
    try {
        const userAlreadyExists = await User.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            email,
            password: hashedPassword,
            nickName,
        })

        await user.save()
        user.password = null

        generateTokenAndSetCookie(res, user._id)

        return user

    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

async function login(userBack, res) {
    const { email, password } = userBack
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User dos not exists" })
        }

        const auth = await compare(password, user.password)

        if (!auth) {
            return res.status(400).json({ success: false, message: "Password is incorrect!" })
        }

        generateTokenAndSetCookie(res, user._id)

        user.password = null

        return user

    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

async function logOut(res) {
    try {
        clearCookie(res)

    } catch (error) {
        res.status(404).json({ success: false, message: error.message })
    }
}

function validateToken(token) {
    try {
        if (!token) return null
        const json = jwt.verify(token, process.env.JWT_SECRET)
  
        const loggedInUser = json.userId

        return loggedInUser

    } catch (err) {
        console.log('Invalid login token: ', err)
    }
    // return null
}