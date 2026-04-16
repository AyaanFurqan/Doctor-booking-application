import validator from 'validator'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'

// API to register user
export const registeruser = async (req, res) => {
   const { name, email, password } = req.body

   try {
      if (!name || !email || !password) {
         return res.json({ success: false, message: 'please provide full details' })
      }

      if (!validator.isEmail(email)) {
         return res.json({ success: false, message: 'Enter a valid email' })
      }

      const emailexist = await userModel.findOne({ email })

      if (emailexist) {
         return res.json({ success: false, message: 'This email is already in use ' })
      }

      if (!validator.isStrongPassword(password)) {
         return res.json({ success: false, message: 'Enter a strong password' })
      }

      const hashedpassword = await bcrypt.hash(password, 10)

      const userdata = {
         name,
         email,
         password: hashedpassword
      }

      const newUser = new userModel(userdata)
      await newUser.save()

      res.json({ success: true, message: 'User registered successfully' })
   }
   catch (error) {
      res.json({ success: false, message: error.message })
      console.log(error)
   }
}

// User Login API
export const loginuser = async (req, res) => {
   const { email, password } = req.body
   try {
      if (!email || !password) {
         return res.json({ success: false, message: 'Please provide full details' })
      }

      const user = await userModel.findOne({ email })

      if (!user) {
         return res.json({ success: false, message: 'User does not exist' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
         return res.json({ success: false, message: 'Invalid credentials' })
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

      res.cookie('token', token, {
         maxAge: 7 * 24 * 60 * 60 * 1000,
         httpOnly: true
      })

      res.json({ success: true, message: 'Login success' })
   }

   catch (error) {
      res.json(error.message)
      console.log(error)
   }
}

// API to getprofile
export const getprofile = async (req, res) => {
   const id = req.body
   try {
      const userdata = await userModel.findById(id).select('-password')
      if (!userdata) {
         return res.json({ success: false, message: 'User not found' })
      }
      res.json({ success: true, userdata })
   }
   catch (error) {
      res.json(error.message)
      console.log(error)
   }


}

// API to update user profile
export const updateprofile = async(req, res) => {
   const id = req.body
   const { name, address, dob, gender, phone } = req.body
   const imageFile = req.file

   try {
      if (!name || !address || !dob || !gender || !phone) {
         return res.json({ success: false, message: 'Missing details' })
      }

      await userModel.findByIdAndUpdate(id,{name, address:JSON.parse(address), dob, gender, phone })
      
      if(imageFile){
         // Upload image file to cloudinary
         
      }

   }
   catch (error) {

   }

}

export const userlogout = (req, res) => {
   res.clearCookie('token', {
      httpOnly: true
   })
   res.json({ success: true, message: 'Logout success' })
}