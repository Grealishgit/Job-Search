import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import { ChevronLeft } from 'lucide-react';

const Applications = () => {

    const [isEdit, setIsEdit] = useState(false);
    const [resume, setResume] = useState(null)

    return (
        <>
            <Navbar />

            <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10 pt-25'>
                <a className='flex mb-3 font-bold' href="/"> <ChevronLeft /> Back</a>
                <h2 className='text-xl font-semibold'>Your Resume</h2>
                <div className='flex gap-2 mb-6 mt-3'>
                    {
                        isEdit ?
                            <>
                                <label className='flex items-center gap-3' htmlFor="resumeUpload">
                                    <p className='bg-blue-100 text-teal-600 px-4 py-2 rounded'>Select Resume</p>
                                    <input
                                        onChange={e => setResume(e.target.files[0])}
                                        accept='application/pdf'
                                        type="file"
                                        hidden
                                        id='resumeUpload'
                                    />
                                    <img src={assets.profile_upload_icon} alt="" />
                                </label>
                                <button onClick={() => setIsEdit(false)} className='bg-teal-100 border border-green-400 rounded px-5 py-2'>Save</button>

                            </> :

                            <div className='flex gap-2'>
                                <a className='bg-teal-100 text-black px-4 py-2 rounded' href="">Resume</a>
                                <button onClick={() => setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded px-4 py-2'>Edit</button>
                            </div>
                    }
                </div>
                <h2 className='text-xl font-bold mb-4'>Jobs Applied</h2>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg border-collapse">
                    <thead className="bg-gray-100">
                        <tr className="border border-gray-300">
                            <th className="py-3 px-4 text-left ">Company</th>
                            <th className="py-3 px-4 text-left  max-sm:text-sm">Job Title</th>
                            <th className="py-3 px-4 text-left  max-sm:hidden">Location</th>
                            <th className="py-3 px-4 text-left  max-sm:hidden">Date</th>
                            <th className="py-3 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobsApplied.map((job, index) => (
                            <tr key={index} className="border border-gray-300">
                                <td className="py-3 px-4 flex items-center gap-2 ">
                                    <img className="w-8 h-8" src={job.logo} alt="" />
                                    {job.company}
                                </td>
                                <td className="py-2 px-4 ">{job.title}</td>
                                <td className="py-2 px-4  max-sm:hidden">{job.location}</td>
                                <td className="py-2 px-4  max-sm:hidden">{moment(job.date).format('ll')}</td>
                                <td className="py-2 px-4">
                                    <span className={`${job.status === 'Accepted' ? 'bg-green-300' : job.status === 'Rejected' ? 'bg-red-300' : 'bg-blue-300'}
                                    px-4 py-1.5 rounded`}>
                                        {job.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>












            <Footer />
        </>
    )
}

export default Applications