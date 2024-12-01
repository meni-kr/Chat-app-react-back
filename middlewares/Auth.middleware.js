import jwt from "jsonwebtoken"

export function verifyToken(req, res, next) {
    const token = req.cookies.token
    if (!token) return res.this.status(401).send({ success: false, message: "You are not Authorized to access" })
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) return res.status(403).send({ success: false, message: "Token is not valid" })
        req.userId = payload.userId
    next()
    })
}