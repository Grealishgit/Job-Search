import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import { v2 as cloudinary } from 'cloudinary'



//Get User Data
export const getUserData = async (req, res) => {

    const userId = req.auth.userId
    try {

        const user = await User.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'User Not Found' })
        }
        res.json({ success: true, user })


    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

//Apply for a job

export const applyFoJob = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.auth.userId;

    try {
        // Check if the user has already applied for this job
        const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });

        if (isAlreadyApplied) {  // ✅ Check if a record exists
            return res.json({ success: false, message: "Already Applied" });
        }

        // Find the job
        const jobData = await Job.findById(jobId);
        if (!jobData) {
            return res.json({ success: false, message: "No Job Found" });
        }

        // Save the job application
        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now(),
        });

        res.json({ success: true, message: "Application Successful" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//Get User Applied Applications
export const getUserJobApplications = async (req, res) => {


    try {

        const userId = req.auth.userId
        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!applications) {
            return res.json({ success: false, message: 'No Job Applications Found' })
        }

        return res.json({ success: true, applications, message: 'Job Applications Fetched' })


    } catch (error) {

    }
}

//Update User Profile(resume)
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const resumeFile = req.file;

        const userData = await User.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeUpload.secure_url;
            await userData.save();  
        }

        return res.json({ success: true, message: "Resume Updated", resume: userData.resume });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
