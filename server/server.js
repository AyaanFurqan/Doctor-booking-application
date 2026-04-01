import express from "express"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from "./config/config.js"
import 'dotenv/config'


const app = express()
const port = '3000'


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

// API endpoints


connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

 }).catch((err) => {
    console.log("Database connection failed", err);
});