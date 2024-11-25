import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"

import { connectDB } from "./db/connectDB.js"

import authRoutes from "./api/auth/auth.routes.js"
import userRoutes from "./api/user/user.routes.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

const corsOptions = {
    origin:[process.env.ORIGIN],
    credentials:true
}

app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.json())


app.use("/api/auth", authRoutes)
app.use('/api/user', userRoutes)


app.listen(port, () => {
    connectDB()
    console.log(`server is running at http://localhost:${port}`)
})
