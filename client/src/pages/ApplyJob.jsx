import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import kconvert from 'k-convert'
import moment from 'moment'
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';
import { ChevronLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

const ApplyJob = () => {

  const { getToken } = useAuth()

  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)
  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);
  const [visibleJobs, setVisibleJobs] = useState(1);

  const navigate = useNavigate();

  const fetchJob = async () => {

    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)
      if (data.success) {
        setJobData(data.job)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  };

  const applyHandler = async () => {
    try {

      if (!userData) {
        console.log("User Data:", userData);
        return toast.error('Login to Apply for jobs')
      }
      if (!userData.resume) {
        navigate('/applications')
        return toast.error('Upload resume to apply for jobs')
      }



      const { data } = await axios.post(backendUrl + '/api/users/apply',
        { jobId: JobData._id }, { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchUserApplications()
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      toast.error(error.message)
    }
  }

  const checkUsersAlreadyAppliedJobs = () => {
    const hasApplied = userApplications.some(item => item.jobId._id === JobData._id)
    setIsAlreadyApplied(hasApplied)
  }

  useEffect(() => {
    fetchJob();

  }, [id])

  useEffect(() => {
    if (userApplications.length > 0 && JobData) {
      checkUsersAlreadyAppliedJobs()
    }

  }, [JobData, userApplications, id])

  return JobData ? (
    <>
      <Navbar />

      <div className='min-h-screen flex flex-col py-10 container pt-25  px-4 2xl:px-20 mx-auto'>
        <a className='flex mb-3 cursor-pointer font-bold' onClick={() => navigate('/')}> <ChevronLeft /> Back</a>
        <div className='bg-white text-black rounded-lg w-full' >
          <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-emerald-50 border border-sky-400 rounded-xl'>
            <div className='flex flex-col md:flex-row items-center'>
              <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' src={JobData.companyId.image} alt="" />
              <div className='text-center md:text-left text-neutral-700'>
                <h1 className='text-2xl sm:text-4xl font-bold'>{JobData.title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>

                  <span className='flex font-bold text-red-500 items-center gap-1'>
                    <img src={assets.suitcase_icon} alt="" />
                    {JobData.companyId.name}
                  </span>

                  <span className='flex font-bold text-purple-500  items-center gap-1'>
                    <img src={assets.location_icon} alt="" />
                    {JobData.location}
                  </span>

                  <span className='flex font-bold items-center gap-1 text-blue-500'>
                    <img src={assets.person_icon} alt="" />
                    {JobData.level}
                  </span>

                  <span className='flex font-bold  items-center gap-1'>
                    <img src={assets.money_icon} alt="" />
                    Estimated Salary: <span className='text-green-500'>{kconvert.convertTo(JobData.salary)}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
              <button onClick={applyHandler} className='bg-teal-500 p-2.5 font-semibold px-10 text-white rounded cursor-pointer'>{isAlreadyApplied ? 'Already Applied' : 'Apply Now'} </button>
              <p className='mt-1 text-gray-600 font-bold'>Posted {moment(JobData.date).fromNow()}</p>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-bold text-2xl text-teal-500 sm:ml-2 ml-3 mb-2'>Job Description</h2>
              <div className='rich-text' dangerouslySetInnerHTML={{ __html: JobData.description }}></div>
              <button onClick={applyHandler} className='bg-teal-500 p-2.5 font-semibold px-10 text-white rounded cursor-pointer mt-5'>{isAlreadyApplied ? 'Already Applied' : 'Apply Now'}</button>
            </div>
            {/* Right section more Jobs */}
            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
              <h2>More Jobs From {JobData.companyId.name}</h2>

              {jobs
                .filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                .filter(job => {
                  //set of applied jobsIds
                  const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
                  //Return true has not applied for this job
                  return !appliedJobsIds.has(job._id)
                })
                .slice(0, visibleJobs)
                .map((job, index) => <JobCard key={index} job={job} />)
              }

              <div className="mt-4 flex gap-4">
                {visibleJobs < jobs.length && (
                  <button
                    className="px-4 py-2 bg-teal-400 cursor-pointer text-white rounded hover:bg-teal-500 transition"
                    onClick={() => setVisibleJobs(prev => prev + 1)}
                  >
                    Show More
                  </button>
                )}

                {visibleJobs > 2 && (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => setVisibleJobs(2)}
                  >
                    Show Less
                  </button>
                )}
              </div>
            </div>

          </div>



        </div>
      </div>
      <Footer />
    </>
  ) :
    <Loading />
}

export default ApplyJob