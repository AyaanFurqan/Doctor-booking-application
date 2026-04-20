import validator from 'validator'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'

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
         httpOnly: true,
         secure: true,
         sameSite: 'None'
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
   const id = req.userId
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
export const updateprofile = async (req, res) => {
   const id = req.userId
   const { name, address, dob, gender, phone } = req.body
   const imageFile = req.file

   try {
      if (!name || !dob || !gender || !phone) {
         return res.json({ success: false, message: 'Missing details' })
      }

      await userModel.findByIdAndUpdate(id, { name, address: JSON.parse(address), dob, gender, phone })

      if (imageFile) {
         // Upload image file to cloudinary
         const imageupload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
         const imageurl = imageupload.secure_url
         await userModel.findByIdAndUpdate(id, { image: imageurl })
      }

      return res.json({ success: true, message: 'Profile updated' })

   }
   catch (error) {
      res.json(error.message)
      console.log(error)
   }

}

export const userlogout = (req, res) => {
   res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
   })
   res.json({ success: true, message: 'Logout success' })
}

//  API to book an appointment

export const bookappointment = async (req, res) => {
   try {
      const id = req.userId
      const { docId, slotTime, slotDate } = req.body
      const docData = await doctorModel.findById(docId).select('-password')
      if (!docData.available) {
         return res.json({ success: false, message: 'Doctor not availbale' })
      }

      let slots_booked = docData.slots_booked

      // Checking for slots Availablity

      if (slots_booked[slotDate]) {
         if (slots_booked[slotDate].includes(slotTime)) {
            return res.json({ success: false, message: 'Slot is Not available' })
         } else {
            slots_booked[slotDate].push(slotTime)
         }
      } else {
         slots_booked[slotDate] = []
         slots_booked[slotDate].push(slotTime)
      }

      const userData = await userModel.findById(id).select('-password')
      delete docData.slots_booked

      const appointmentData = {
         userId: id,
         docId,
         slotDate,
         slotTime,
         userData,
         docData,
         amount: docData.fees,
         date: Date.now(),
      }

      const newAppointment = new appointmentModel(appointmentData)
      await newAppointment.save()

      await doctorModel.findByIdAndUpdate(docId, { slots_booked })

      res.json({ success: true, message: 'Appointment Booked' })
   }

   catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }

}

// API to get users appointments
export const myappointments = async(req, res) => {
   try {
    const id = req.userId
    const appointments = await appointmentModel.find({userId: id})
    res.json({success:true, appointments})

    } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: error.message
    })
  }
}

// API to cancel Appointment
export const cancelappointment = async(req, res)=>{
   try{
      const id = req.userId

    const {appointmentid} = req.body

    const appointmentdata = await appointmentModel.findById(appointmentid)

     if (appointmentdata.userId !== id){
       res.json('User not authorized')
     }
     await appointmentModel.findByIdAndUpdate(appointmentid,{cancelled:true})
     //   releasing doctors slot
     const {docId, slotDate, slotTime} = appointmentdata

     const doctorData = await doctorModel.findById(docId)

     let slots_booked = doctorData.slots_booked

     slots_booked[slotDate] = slots_booked[slotDate].filter(e=> e !== slotTime)

     await doctorModel.findByIdAndUpdate(docId, {slots_booked})

     return res.json({success:true, message:'Appointment cancelled'})
   }
   catch(error){
    console.log(error)
    res.json({success:false, message:error.message})
   }
}

export const onlinepayement = async(req,res)=>{
   const id = req.userId
   const {appointmentId} = req.body
   const appointmentdata = await appointmentModel.findById(appointmentId)
   if(appointmentdata.userId !== id){
      return res.json({success:false, message:'User is not Authorized'})
   }
   await appointmentModel.findByIdAndUpdate(appointmentId,{payment:true})
   return res.json({success:true, message:`Your payement of ${appointmentdata.amount} is successful`})
}