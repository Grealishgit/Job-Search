import Company from "../models/Company.js";
import bcrypt from 'bcrypt'

//Register a new comapany
export const registerCompany = async (req, res) => {

    const { name, email, password } = req.body

    const imageFile = req.file;
    if (!name || !email || !password || !imageFile) {
        return res.json({ success: false, message: "Missing Details" })

    }
    try {

        const companyExists = await Company.findOne({ email });
        if (companyExists) {
            return res.json({ success: false, message: "Company Already Exists" });
        }

        const salt = await bcrypt.getSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

    } catch (error) {

    }

}

//  Comapany Login
export const loginCompany = async (req, res) => {

}

export const getCompanyData = async (req, res) => {

}

//post new job
export const postJob = async (req, res) => {

}

//get applicants
export const getCompanyJobApplicants = async (req, res) => {

}


export const getCompanyPostedJobs = async (req, res) => {

}

//change job application status
export const changeJobApplicationStatus = async (req, res) => {

}

//change Job Visibility
export const changeVisibility = async (req, res) => {

}

