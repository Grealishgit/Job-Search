import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { X } from "lucide-react";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
//import toast from 'react-toastify'


const RecruiterLogin = () => {

    const navigate = useNavigate();

    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [image, setImage] = useState(false);
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
    const { showRecruiterLogin, setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (state == "Sign Up" && !isTextDataSubmitted) {
            return setIsTextDataSubmitted(true);
        }


        try {
            if (state === "Login") {
                const { data } = await axios.post(backendUrl + '/api/company/login', { email, password })
                if (data.success) {
                    toast.success(data.message || "Login Successful");
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard/view-applications')
                    //console.log(data);

                } else {
                    toast.error(data.message || "Login Failed");

                }
            } else {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', email)
                formData.append('image', image)

                const { data } = await axios.post(backendUrl + '/api/company/register', formData)

                if (data.success) {
                    toast.success(data.message || "Registration Successful");
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard/view-applications')
                    //console.log(data);

                } else {
                    toast.error(data.message || "Registration Failed Try Again");

                }
            }
        } catch (error) {
            toast.error(error.message)
        }


    }
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }

    }, [])

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500' >
                <h1 className='text-center text-2xl text-neutral-700 font-bold'>Recruiter <span className='text-teal-500'>{state}</span> </h1>
                <p className='text-sm font-semibold'>Welcome back! Please sign in to continue</p>
                {
                    state === "Sign Up" && isTextDataSubmitted ?
                        <>
                            <div className='flex items-center gap-4 my-10'>
                                <label htmlFor="image">
                                    <img className='w-16 rounde0=-full' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                    <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
                                </label>
                                <p>Upload Company <br />Logo</p>
                            </div>
                        </>
                        :
                        <>

                            {state !== 'Login' && (
                                <div className='border px-4 py-2 flex items-center gap-2 rounded-md mt-5'>
                                    <img src={assets.person_icon} alt="" />
                                    <input className='outline-none' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Company Name' required />
                                </div>
                            )}


                            <div className='border px-4 py-2 flex items-center gap-2 rounded-md mt-5'>
                                <img src={assets.email_icon} alt="" />
                                <input className='outline-none' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required />
                            </div>

                            <div className='border px-4 py-2 flex items-center my-4 gap-2 rounded-md mt-5'>
                                <img src={assets.lock_icon} alt="" />
                                <input className='outline-none' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
                            </div>
                        </>
                }
                {state === 'Login' && <p onClick={() => navigate('/dashboard')} className='text-sm text-teal-500 underline my-4 cursor-pointer'>Forgot Password</p>}

                <button type='submit' className='bg-teal-500 w-full text-white py-2 cursor-pointer rounded-md gap-2'>
                    {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create Account' : 'Next'}
                </button>

                {
                    state === 'Login' ?
                        <p className='mt-5 text-center font-medium'>Don't have an Account? <span className='text-teal-600 cursor-pointer font-semibold' onClick={() => setState("Sign Up")}>Sign Up</span></p>
                        :
                        <p className='mt-5 text-center font-medium'>Already have an Account? <span className='text-teal-600 cursor-pointer font-semibold' onClick={() => setState("Login")}>Login</span></p>
                }

                <X onClick={e => setShowRecruiterLogin(false)} className='absolute top-5 w-10 right-5 cursor-pointer text-teal-500' />
            </form>
        </div>
    )
}

export default RecruiterLogin