import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
export const adddoctor = async (req, res) => {

    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        if (!name, !email, !password, !speciality, !degree, !experience, !about, !fees, !address) {
            res.json({ success: false, message: "Missing details" })
        }

        if (!validator.isEmail(email)) {
            res.json({ success: false, message: "please enter a valid email" })
        }

        if (password.length > 8) {
            res.json({ success: false, meassage: "please enter a strong password" })
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

        res.json({ success: true, message: "doctor added successfully" })

    } catch (error) {
        res.json({ success: false, message: error })
        console.log(error)
    }
}

export const adminlogin = (req, res) => {
    const { email, password } = req.body
    try {
        if (!email, !password) {
            res.json({ success: false, message: 'please provide login details' })
        }
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)

            res.cookie("atoken", token,{
                maxAge: 7*24*60*60*1000,
                httpOnly:true
            })

            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'invalid credentials' })
        }

    } catch (error) {
        res.json({ success: false, message: error })
        console.log(error)
    }
}
