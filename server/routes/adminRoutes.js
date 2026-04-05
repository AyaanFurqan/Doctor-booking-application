import express from 'express';
import { adddoctor, adminlogin } from '../controllers/adminController.js';

import upload from '../middleware/multer.js';
import adminauth from '../middleware/adminauth.js';

const adminRouter = express.Router()

adminRouter.post('/add-doctor',adminauth, upload.single('image'), adddoctor)
adminRouter.post('/admin-login', adminlogin)

export default adminRouter;



