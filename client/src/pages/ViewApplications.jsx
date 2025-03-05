import React, { useContext, useEffect, useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const ViewApplications = () => {


    const { backendUrl, companyToken } = useContext(AppContext);
    const [applicants, setApplicants] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(null);


    const handleStatusChange = (id, status) => {
        changeJobApplicationStatus(id, status);
        setOpenDropdown(null); // Close dropdown after clicking
    };


    const fetchCompanyJobApplications = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/applicants', {
                headers: { token: companyToken }
            });

            if (data.success) {
                setApplicants(data.applications.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    //Function to Update Job Application status
    const changeJobApplicationStatus = async (id, status) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/company/change-status',
                { id, status },
                { headers: { token: companyToken } }
            );

            if (data.success) {
                toast.success(data.message);

                // Update the status of the specific applicant without refetching
                setApplicants(prevApplicants =>
                    prevApplicants.map(applicant =>
                        applicant._id === id ? { ...applicant, status } : applicant
                    )
                );

                setOpenDropdown(null); // Close the dropdown after updating
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };


    useEffect(() => {
        if (companyToken) {
            fetchCompanyJobApplications()
        }

    }, [companyToken])

    return applicants ? applicants.length === 0 ? (
        <div className='flex items-center justify-center h-[70vh]' >
            <p className='text-xl font-bold text-red-500 sm:tet-2xl'>No Applications Available</p>
        </div>
    ) :
        (
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
                            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
                                <tr key={index} className='border-b border-gray-400 hover:bg-gray-50'>
                                    <td className='py-2 px-4 text-center'>{index + 1}</td>
                                    <td className='py-2 px-4 flex text-center items-center'>
                                        <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={applicant.userId.image} alt="" />
                                        <span>{applicant.userId.name}</span>
                                    </td>
                                    <td className='py-2 px-4 max-sm:hidden'>{applicant.jobId.title}</td>
                                    <td className='py-2 px-4 max-sm:hidden'>{applicant.jobId.location}</td>
                                    <td className='py-2 px-4'>
                                        {applicant.userId.resume && (
                                            <a href={applicant.userId.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='bg-teal-50 text-blue-500 px-3 py-1 font-medium rounded inline-flex gap-2 items-center'>
                                                Resume <img src={assets.resume_download_icon} alt="" />
                                            </a>
                                        )}

                                    </td>
                                    <td className='py-2 px-4 relative'>
                                        {applicant.status === "Pending" ? (
                                            <div className='relative inline-block text-left'>
                                                {/* Toggle button */}
                                                <button
                                                    onClick={() => setOpenDropdown(openDropdown === applicant._id ? null : applicant._id)}
                                                    className='text-gray-500 action-button'
                                                >
                                                    ...
                                                </button>

                                                {/* Dropdown menu */}
                                                {openDropdown === applicant._id && (
                                                    <div className='absolute right-0 z-50 mt-2 w-32 bg-white border border-gray-200 rounded shadow'>
                                                        <button
                                                            onClick={() => handleStatusChange(applicant._id, 'Accepted')}
                                                            className='block font-semibold w-full text-left px-4 py-2 text-green-600 hover:bg-green-100'
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusChange(applicant._id, 'Rejected')}
                                                            className='block font-semibold w-full text-left px-4 py-2 text-red-600 hover:bg-red-100'
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div
                                                className={`font-semibold px-3 py-1 rounded w-fit 
                ${applicant.status === 'Accepted' ? 'text-green-500 bg-green-100' : ''} 
                ${applicant.status === 'Rejected' ? 'text-red-500 bg-red-100' : ''}`}
                                            >
                                                {applicant.status}
                                                </div>
                                        )}
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        ) : <Loading />
}

export default ViewApplications