import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

//Register a new comapany
export const registerCompany = async (req, res) => {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {
        const companyExists = await Company.findOne({ email });
        if (companyExists) {
            return res.json({ success: false, message: "Company Already Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        });

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id),
            message: 'Company Registered Successfully'
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


//  Comapany Login
export const loginCompany = async (req, res) => {
    const { email, password } = req.body;

    try {
        const company = await Company.findOne({ email });

        if (!company) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, company.password);

        if (!isPasswordValid) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id),
            message: 'Company logged in successfully'
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getCompanyData = async (req, res) => {


    try {

        const company = req.company

        res.json({ success: true, company, message: 'Company Data Fetched Successfully' })
    } catch (error) {
        res.json({ success: false, message:error.message })

    }


}

//post new job
export const postJob = async (req, res) => {

    const { title, description, location, salary, level, category } = req.body

    const companyId = req.company._id
    try {

        const newJob = new Job({
            title,
            description,
            location,
            salary,
            level,
            category,
            companyId,
            date: Date.now()
        })
        await newJob.save()
        res.json({ success: true, newJob, message: 'New Job Posted' })

    } catch (error) {
        res.json({ success: true, message: error.message })

    }


}

//get applicants
export const getCompanyJobApplicants = async (req, res) => {

    try {
        const companyId = req.company._id;
        //Find job appliacations for the user and populate the user data
        const applications = await JobApplication.find({ companyId })
            .populate('userId', 'name image resume')
            .populate('jobId', 'title location category level salary')
            .exec()
        return res.json({ success: true, applications })

    } catch (error) {
        return res.json({ success: false, message: error.message })

    }


}


export const getCompanyPostedJobs = async (req, res) => {

    try {
        const companyId = req.company._id
        const jobs = await Job.find({ companyId })

        //(Adding) no of Applicants info in data
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({ jobId: job._id });
            return {
                ...job.toObject(),
                applicants: applicants.length,
                visible: job.visible // Ensure visibility is included
            };
        }));



        res.json({ success: true, jobsData, message: 'Posted Jobs fetched successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }


}

//change job application status
export const changeJobApplicationStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        // Check if the job application exists
        const application = await JobApplication.findById(id);
        if (!application) {
            return res.json({ success: false, message: 'Job application not found' });
        }

        // Update the status
        application.status = status;
        await application.save();

        return res.json({ success: true, message: 'Applicant application status changed successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


//change Job Visibility
export const changeVisibility = async (req, res) => {

    try {
        const { id } = req.body
        const companyId = req.company._id

        const job = await Job.findById(id)

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible
        }

        await job.save()

        res.json({ success: true, job, message: 'Job Visibiity Changed' })


    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

