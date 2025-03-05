import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loading from '../components/Loading'

const ManageJobs = () => {

    const navigate = useNavigate();

    const { backendUrl, companyToken } = useContext(AppContext);
    const [jobs, setJobs] = useState(false);


    const fetchCompanyJobs = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/company/list-jobs',
                { headers: { token: companyToken } }
            )

            if (data.success) {
                setJobs(data.jobsData.reverse())
                //toast.success(data.message)
                console.log(data.jobsData);

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    //Function to change job visibility
    const changeJobVisibility = async (id) => {
        try {
            // Optimistically update state before the API call
            setJobs(prevJobs =>
                prevJobs.map(job =>
                    job._id === id ? { ...job, visible: !job.visible } : job
                )
            );

            const { data } = await axios.post(
                backendUrl + '/api/company/change-visibility',
                { id },
                { headers: { token: companyToken } }
            );

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
                // Revert state if API fails
                setJobs(prevJobs =>
                    prevJobs.map(job =>
                        job._id === id ? { ...job, visible: !job.visible } : job
                    )
                );
            }

        } catch (error) {
            toast.error(error.message);
            // Revert state on error
            setJobs(prevJobs =>
                prevJobs.map(job =>
                    job._id === id ? { ...job, visible: !job.visible } : job
                )
            );
        }
    };


    useEffect(() => {
        if (companyToken) {
            fetchCompanyJobs()
        }

    }, [companyToken])

    return jobs ? jobs.length === 0 ? (
        <div className='flex items-center justify-center h-[70vh]' >
            <p className='text-xl font-bold text-red-500 sm:tet-2xl'>No Jobs Available or Posted</p>
        </div>
    ) : (
        <div className='container p-4 max-w-5xl'>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-400 max-sm:text-sm'>
                    <thead>
                        <tr>
                            <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
                            <th className='py-2 px-4 border-b text-left' >Job Title</th>
                            <th className='py-2 px-4 border-b text-left max-sm:hidden' >Date</th>
                            <th className='py-2 px-4 border-b text-left max-sm:hidden' >Location</th>
                            <th className='py-2 px-4 border-b text-center' >Applicants</th>
                            <th className='py-2 px-4 border-b text-left' >Visible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={index} className='text-gray-700 border-b border-gray-400'>
                                <td className='py-2 px-4  max-sm:hidden'>{index + 1}</td>
                                <td className='py-2 px-4'>{job.title}</td>
                                <td className='py-2 px-4 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                                <td className='py-2 px-4 max-sm:hidden' >{job.location}</td>
                                <td className='py-2 px-4 text-center'>{job.applicants}</td>
                                <td className='py-2 px-4 '>
                                    <input onChange={() => changeJobVisibility(job._id)} className='scale-125 ml-4' type="checkbox" checked={job.visible} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='mt-4 flex md:justify-end  justify-center'>
                <button onClick={() => navigate('/dashboard/add-job')} className='bg-teal-500 font-semibold text-white md:py-2 py-2 md:px-4 w-full md:max-w-38 rounded cursor-pointer'>Add New Job</button>
            </div>
        </div >
    ) : <Loading />
}

export default ManageJobs