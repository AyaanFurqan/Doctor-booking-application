import express from 'express'
import { bookappointment, getprofile, loginuser, myappointments, registeruser, updateprofile, userlogout, cancelappointment, onlinepayement } from '../controllers/userController.js'
import { userauth } from '../middleware/userauth.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registeruser)
userRouter.post('/login', loginuser)
userRouter.get('/userauth', userauth, (req, res) =>{
    res.json({success: true, message:'User authenticated'})
})
userRouter.get('/logout', userlogout)
userRouter.get('/get-profile', userauth, getprofile)
userRouter.post('/update-profile',upload.single('image'), userauth, updateprofile)
userRouter.post('/book-appointment', userauth, bookappointment)
userRouter.get('/my-appointments', userauth, myappointments)
userRouter.post('/cancel-appointment', userauth, cancelappointment)
userRouter.post('/online-payment', userauth, onlinepayement)

export default userRouter