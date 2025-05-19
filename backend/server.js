import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/authRoutes.route.js'
import messageRoutes from './routes/messageRoutes.route.js'
import userRoutes from './routes/userRoutes.route.js'

import connectToMongoDB from './db/connectToMongoDB.js'

const app=express()
const port=process.env.PORT||5000

// SO WE CAN USE .ENV VARIABLES IN THIS FILE
dotenv.config()

app.use(express.json())// converts the req into json 
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)


app.listen(port,()=>{
    connectToMongoDB()
    console.log(`Server running on port ${port}`);
    
})