
import express from "express"
import 'dotenv/config'
import cors from 'cors'

import verifyToken from "./misc/verifyToken.js"
import { foodsRoute, foodListRoute, trackDataRoute } from "./routes/get.js"
import { addDataRoute, loginRoute, registerRoute } from "./routes/post.js"
import connectDB from "./db.js"
import limiter from "./misc/limiter.js"

const app = express()
app.use(limiter)
app.use(express.json())
app.use(cors())

connectDB()

app.post("/register", registerRoute)

app.post("/login", loginRoute)

app.post("/add", verifyToken, addDataRoute)

app.get("/foods", verifyToken, foodsRoute)

app.get("/foods/:name",verifyToken, foodListRoute )

app.get("/add/:userId/:date", verifyToken, trackDataRoute)

app.listen(8000, () => {
    console.log("Server Running at http://localhost:8000")
})