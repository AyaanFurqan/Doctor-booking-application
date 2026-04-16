import express from 'express'
import { getprofile, loginuser, registeruser, userlogout } from '../controllers/userController.js'
import { userauth } from '../middleware/userauth.js'

const userRouter = express.Router()

userRouter.post('/register', registeruser)
userRouter.post('/login', loginuser)
userRouter.get('/userauth', userauth, (req, res) =>{
    res.json({success: true, message:'User authenticated'})
})
userRouter.get('/logout', userlogout)
userRouter.get('/get-profile', userauth, getprofile)

export default userRouter