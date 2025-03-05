import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {

    const navigate = useNavigate();


    return (
        <div className='border hover:bg-[#dcd7b5]  border-gray-300 p-6 shadow-md rounded'>
            <div className='flex justify-between items-center'>
                <img className='h-8' src={job.companyId.image} alt="" />
            </div>
            <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
            <div className='flex items-center gap-3 mt-2 text-xs'>
                <span className='bg-indigo-50 border border-indigo-200 px-4 py-1.5 rounded'>{job.location}</span>
                <span className='bg-green-50 border border-green-200 px-4 py-1.5 rounded'>{job.level}</span>
            </div>
            <p className='text-gray-500  text-sm mt-4' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>
            <div className='mt-4 flex gap-4 text-sm'>
                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='bg-teal-500 cursor-pointer text-white px-4 py-2 rounded'>Apply Now</button>
                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='text-gray-500 cursor-pointer border border-gray-500 rounded px-4 py-2'>Learn More</button>
            </div>
        </div >
    )
}

export default JobCard