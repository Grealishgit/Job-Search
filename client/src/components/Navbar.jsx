import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useClerk, useUser, UserButton, SignInButton } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const { openSignIn } = useClerk();
    const { user } = useUser();

    const navigate = useNavigate();
    const { setShowRecruiterLogin } = useContext(AppContext);



    return (
        <div className='shadow bg-gradient-to-tl from-gray-200 via-gray-100 to-orange-500 py-4 fixed top-0 z-50 w-full'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <img className='cursor-pointer' onClick={() => navigate('/')} src={assets.logo} alt="Logo" />

                {
                    user
                        ? <div className='flex items-center gap-3'>
                            <Link className='font-semibold' to={'/applications'}>Applied Jobs</Link>
                            <p className='font-semibold'>|</p>
                            <p className='max-sm:hidden'>Hi! <span className='text-white font-bold'>{user.firstName}</span> </p>
                            <UserButton />
                        </div>
                        : <div className='flex gap-4 max-sm:text-s'>
                            <button onClick={() => setShowRecruiterLogin(true)} className='text-gray-600 font-bold cursor-pointer'>Recruiter Login</button>
                            <button onClick={() => openSignIn()} className='bg-orange-400 cursor-pointer text-white px-6 sm:px-9 py-2 rounded-md'>
                                Login
                            </button>

                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
