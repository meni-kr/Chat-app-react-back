import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import http from 'http'
import cookieParser from "cookie-parser"

import { connectDB } from "./db/connectDB.js"

import authRoutes from "./api/auth/auth.routes.js"
import userRoutes from "./api/user/user.routes.js"
import { setupSocketAPI } from "./services/socket.service.js"
import { setupAsyncLocalStorage } from "./middlewares/setupAls.middleware.js"

dotenv.config()

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 5000

const corsOptions = {
    origin:[process.env.ORIGIN],
    credentials:true
}

app.use(cors(corsOptions))

app.use("/uploads/profiles", express.static("uploads/profiles"))

app.use(express.json())
app.use(cookieParser())

app.all('*', setupAsyncLocalStorage)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

setupSocketAPI(server)


server.listen(port, () => {
    connectDB()
    console.log(`server is running at http://localhost:${port}`)
})
