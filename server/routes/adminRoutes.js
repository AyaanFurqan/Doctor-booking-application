import express from 'express';
import { adddoctor, adminlogin, adminlogout } from '../controllers/adminController.js';

import upload from '../middleware/multer.js';
import adminauth from '../middleware/adminauth.js';

const adminRouter = express.Router()

adminRouter.post('/add-doctor',adminauth, upload.single('image'), adddoctor)
adminRouter.post('/admin-login', adminlogin)
adminRouter.get('/check-auth', adminauth, (req,res)=>{res.json({success:true, message:'Admin authenticated'})})
adminRouter.get('/admin-logout', adminlogout)

export default adminRouter;



