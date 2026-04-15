import express from 'express'
import { loginuser, registeruser, userlogout } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register', registeruser)
userRouter.post('/login', loginuser)
userRouter.get('/userauth', (req, res) =>{
    res.json({success: true, message:'User authenticated'})
})
userRouter.get('/logout', userlogout)

export default userRouter