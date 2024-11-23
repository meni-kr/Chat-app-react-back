import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"


dotenv.config()

const app = express()
const port = process.env.PORT || 3030
const databaseURL = process.env.DATABASE_URL

const corsOptions = {
    origin:[process.env.ORIGIN],
    credentials:true
}

app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.json())

const server = app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);

})

mongoose.connect(databaseURL)
    .then(() => console.log("DB Connection Successfully"))
    .catch((err) => console.log("error msg: ", err.message))
