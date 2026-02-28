import express from 'express'
import { dashboard } from '../controllers/usercontroller.js'

const userrouter = express.Router()

userrouter.get('/dashboard', dashboard)

export default userrouter;