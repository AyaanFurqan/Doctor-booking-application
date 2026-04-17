import express from 'express'
import { getprofile, loginuser, registeruser, updateprofile, userlogout } from '../controllers/userController.js'
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

export default userRouter