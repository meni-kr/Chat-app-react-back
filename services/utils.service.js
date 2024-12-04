import jwt from 'jsonwebtoken'

// export function generateVerificationToken() {
//     return Math.floor(100000 + Math.random() * 900000).toString()
// }

export function generateTokenAndSetCookie(res, userId) {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export function clearCookie(res){
    res.cookie("token","",{maxAge:1,secure:true,sameSite:"none"})
}