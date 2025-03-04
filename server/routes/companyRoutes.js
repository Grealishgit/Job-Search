import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controller/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middlewares/authMiddleware.js';

const router = express.Router()

//Register a company
router.post('/register', upload.single('image'), registerCompany);

//company login
router.post('/login', loginCompany);

//Post Job
router.post('/post-job', protectCompany, postJob);

//Get Company Data
router.get('/company', protectCompany, getCompanyData);

//Get Company Job List
router.get('/list-jobs', protectCompany, getCompanyPostedJobs)

//Get Applicants Data of Company
router.get('/applicants', protectCompany, getCompanyJobApplicants)

//Get Company Job List
router.post('/change-status', protectCompany, changeJobApplicationStatus);

//Change Applications Visibility
router.post('/change-visibility', protectCompany, changeVisibility)

export default router;