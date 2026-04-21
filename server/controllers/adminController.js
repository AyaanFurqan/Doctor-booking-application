import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const adddoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email" })
        }

        const emailexist = await doctorModel.findOne({ email })

        if (emailexist) {
            return res.json({ success: false, message: 'Email already registered' })
        }



        if (!validator.isStrongPassword(password)) {
            return res.json({ success: false, message: "please enter a strong password" })
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        // uploading image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageurl = imageUpload.secure_url

        const doctordata = {
            name,
            email,
            password: hashedpassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            image: imageurl,
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctordata)
        await newDoctor.save()

        return res.json({ success: true, message: "doctor added successfully" })

    } catch (error) {
        return res.json({ success: false, message: error })
        console.log(error)
    }
}

export const adminlogin = (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.json({ success: false, message: 'please provide login details' })
        }
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)

            res.cookie("atoken", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure:true,
                sameSite:'None'
            })   

            return res.json({ success: true, token, message: 'Login success' })
        }
        else {
            return res.json({ success: false, message: 'invalid credentials' })
        }

    } catch (error) {
        return res.json({ success: false, message: error })
        console.log(error)
    }
}

export const alldoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        return res.json({ success: true, doctors })
    }
    catch (error) {
        return res.json({ success: false, message: error })
        console.log(error)
    }


}

export const adminlogout = (req, res) => {
    res.clearCookie('atoken', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    })
    return res.json({ success: true, message: 'Logout success' })
}

export const allappointments = async(req,res)=>{
    try {
        const appointments = await appointmentModel.find({}) 
        res.json({success:true, appointments})
    } catch (error) {
        res.json({success:false, message:error.message})
        console.log(error)
    }
    
}

export const adminappointmentcanel = async(req, res)=>{
   try{

    const {appointmentid} = req.body

    const appointmentdata = await appointmentModel.findById(appointmentid)

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