import { authService } from "./auth.service.js"

export async function signup(req, res) {
    const { email, password, nickName } = req.body
    try {
        if (!email || !password || !nickName) {
            return res.status(400).json({ success: false, message: "All fields are required!" })
        }
        const user = await authService.signUp({ email, password, nickName }, res)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export async function login(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        throw new Error("All fields are required!")
    }
    try {
        const user = await authService.login({ email, password },res)
        res.status(200).json({
            success: true,
            message: "User login successfully",
            user
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export async function logout(res){
    try {
        await authService.logOut(res)
        res.status(200).json({
            success: true,
            message: "User logout successfully"
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}