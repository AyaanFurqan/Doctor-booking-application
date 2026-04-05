import express from "express"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from "./config/config.js"
import connectcloudinary from "./config/cloudinary.js"
import 'dotenv/config'
import adminRouter from "./routes/adminroutes.js"

// app config
const app = express()
const port = '3000'

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

 }).catch((err) => {
    console.log("Database connection failed", err);
});
connectcloudinary();

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

// API Endpoints
app.use('/api/admin', adminRouter)







