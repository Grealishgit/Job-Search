import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
    return (
        <div className='container mx-auto p-4'>
            <div>
                <table className='w-full max-w-4xl border border-gray-200 max-sm:text-sm'>
                    <thead>
                        <tr className='border-b bg-teal-100'>
                            <th className='py-2 px-4 text-left'>#</th>
                            <th className='py-2 px-4 text-left'>User name</th>
                            <th className='py-2 px-4 text-left'>Job Title</th>
                            <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
                            <th className='py-2 px-4 text-left max-sm:hidden'>Resume</th>
                            <th className='py-2 px-4 text-left'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewApplicationsPageData.map((applicant, index) => (
                            <tr key={index} className='border-b border-gray-400 hover:bg-gray-50'>
                                <td className='py-2 px-4 text-center'>{index + 1}</td>
                                <td className='py-2 px-4 flex items-center'>
                                    <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={applicant.imgSrc} alt="" />
                                    <span>{applicant.name}</span>
                                </td>
                                <td className='py-2 px-4 max-sm:hidden'>{applicant.jobTitle}</td>
                                <td className='py-2 px-4 max-sm:hidden'>{applicant.location}</td>
                                <td className='py-2 px-4'>
                                    <a href="#" target="_blank"
                                        className='bg-teal-50 text-blue-500 px-3 py-1 font-medium rounded inline-flex gap-2 items-center'>
                                        Resume<img src={assets.resume_download_icon} alt="" />
                                    </a>
                                </td>
                                <td className='py-2 px-4 relative'>
                                    <div className='relative inline-block text-left group'>
                                        <button className='text-gray-500 action-button cursor-pointer'>...</button>
                                        <div className='z-10 hidden absolute right-0 md:left-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                                            <button className='block font-semibold w-full text-left px-4 py-2 text-teal-500 hover:bg-gray-100'>Accept</button>
                                            <button className='block font-semibold w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ViewApplications