import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controller/companyController.js';
import upload from '../config/multer.js';

const router = express.Router()

//Register a company
router.post('/register', upload.single('image'), registerCompany);

//company login
router.post('/login', loginCompany);

//Post Job
router.post('/post-job', postJob);

//Get Company Data
router.get('/company', getCompanyData);

//Get Company Job List
router.get('/list-jobs', getCompanyPostedJobs)

//Get Applicants Data of Company
router.get('/applicants', getCompanyJobApplicants)

//Get Company Job List
router.post('/change-status', changeJobApplicationStatus);

//Change Applications Visibility
router.post('/change-visibility', changeVisibility)

export default router;