import express from 'express'
import { applyFoJob, getUserData, getUserJobApplications, updateUserResume } from '../controller/userController.js'
import upload from '../config/multer.js';

const router = express.Router()

//Get user Data
router.get('/', getUserData);

//Apply for a job
router.post('/apply', applyFoJob);

//Get applied jobs data
router.get('/applications', getUserJobApplications);

//Update user profile (resume)
router.post('/update-resume', upload.single('resume', updateUserResume));
//router.post('/update-resume', upload.single('resume'), updateUserResume);

export default router;