import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()
app.use(cors())

const connect = () => {
	mongoose
		.connect(process.env.MONGO)
		.then(() => {
			console.log("Connected DB")
		})
		.catch(err => {
			console.log(err)
		})
}
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

app.use((err, req, res, next) => {
	const status = err.status || 500
	const message = err.message || "Something went wrong!"

	return res.status(status).json({
		success: false,
		status,
		message
	})
})

app.listen(process.env.PORT || 8800, () => {
	console.log("Connected Server")
	connect()
})