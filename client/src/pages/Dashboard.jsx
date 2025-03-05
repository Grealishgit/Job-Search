import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { BriefcaseBusiness, CirclePlus, UserPen } from 'lucide-react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Dashboard = () => {

    const navigate = useNavigate();
    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

    //Function to logout
    const logout = () => {
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        toast.success('Logged Out Successfully')
        navigate('/')
    }

    useEffect(() => {
        if (companyData) {
            navigate('/dashboard/view-applications')
        }

    }, [companyData])

    return (
        <div>
            {/* Navbar for Recruiter Panel */}
            <div className='shadow py-4'>
                <div className='px-5 flex justify-between items-center'>
                    <img onClick={() => navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
                    {companyData && (
                        <div className='flex items-center gap-3'>
                            <p className='max-sm:hidden font-bold'><span className='text-green-500'>Welcome,</span>  {companyData.name}</p>
                            <div className='relative group'>
                                <img className='w-8 border rounded-full' src={companyData.image} alt="" />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                        <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div className='flex items-start'>
                {/* Left Sidebar With Option to Add, manage and view applications */}
                <div className='inline-block min-h-screen border-r-2'>
                    <ul className='flex flex-col items-start pt-5 text-gray-800'>
                        <NavLink className={({ isActive }) => `flex items-center p-3 gap-2 sm:px-6 w-full hover:bg-gray-100 ${isActive && 'bg-teal-100 border-r-4 border-teal-500'} `} to={'/dashboard/view-applications'} >
                            <UserPen className='min-w-4 text-red-500' />
                            <p className='max-sm:hidden font-semibold text-red-500'>View Applications</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center p-3 gap-2 sm:px-6 w-full hover:bg-gray-100 ${isActive && 'bg-teal-100 border-r-4 border-teal-500'} `} to={'/dashboard/add-job'}>
                            <CirclePlus className='min-w-4 text-teal-500' />
                            <p className='max-sm:hidden font-semibold text-teal-500'>Add Job</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center p-3 gap-2 sm:px-6 w-full hover:bg-gray-100 ${isActive && 'bg-teal-100 border-r-4 border-teal-500'} `} to={'/dashboard/manage-jobs'} >
                            <BriefcaseBusiness className='min-w-4 text-blue-500' />
                            <p className='max-sm:hidden font-semibold text-blue-500'>Manage Jobs</p>
                        </NavLink>


                    </ul>
                </div>


                <div>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Dashboard