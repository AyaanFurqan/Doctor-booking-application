import express from 'express';
import { adddoctor, adminlogin, adminlogout, alldoctors, allappointments, adminappointmentcanel } from '../controllers/adminController.js';

import upload from '../middleware/multer.js';
import adminauth from '../middleware/adminauth.js';
import { changeavailibilty } from '../controllers/doctorController.js';

const adminRouter = express.Router()

adminRouter.post('/add-doctor',adminauth, upload.single('image'), adddoctor)
adminRouter.post('/admin-login', adminlogin)
adminRouter.get('/check-auth', adminauth, (req,res)=>{res.json({success:true, message:'Admin authenticated'})})
adminRouter.get('/admin-logout', adminlogout)
adminRouter.get('/all-doctors', adminauth, alldoctors)
adminRouter.post('/change-availiblity', adminauth, changeavailibilty)
adminRouter.get('/all-appointments', adminauth, allappointments)
adminRouter.post('/cancel-appointment', adminauth, adminappointmentcanel)

export default adminRouter;



