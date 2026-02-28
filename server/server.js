import express from "express"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from "./config/config.js"
import authrouter from "./routes/authroutes.js"
import userrouter from "./routes/userroute.js"
import authmiddleware from "./middleware/authmiddleware.js"
import patientrouter from "./routes/patientroutes.js"
import appointmentrouter from "./routes/appointmentroutes.js"
import prescriptionmodel from "./models/prescriptionmodel.js"
import prescriptionrouter from "./routes/prescriptionroutes.js"
import analyticsrouter from "./routes/analyticsroutes.js"


const app = express()
const port = '3000'


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

app.use('/api/auth', authrouter)
app.use('/api/profile',authmiddleware,userrouter)
app.use('api/patients', patientrouter)
app.use('api/appointments', appointmentrouter)
app.use('api/prescription', prescriptionrouter)
app.use('api/analytics', analyticsrouter)


connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

 }).catch((err) => {
    console.log("Database connection failed", err);
});