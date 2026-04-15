import express from 'express'
import doctorModel from '../models/doctorModel.js'

export const changeavailibilty = async (req, res) => {
    try {
        const { docId } = req.body
        const docdata = await doctorModel.findById(docId)
        if (!docdata) {
            return res.json({ success: false, message: 'doctor not found' })
        }
        await doctorModel.findByIdAndUpdate(docId, { available: !docdata.available })
        return res.json({ success: true, message: 'Availiblity changed' })
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
        console.log(error)
    }

}

export const doctorslist = async(req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        return res.json({ success: true, doctors })
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
        console.log(error)  
    }


}