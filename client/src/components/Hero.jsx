import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { Building } from 'lucide-react'
import { AppContext } from '../context/AppContext'

const Hero = () => {

    const { setSearchFilter, setIsSearched } = useContext(AppContext);

    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        });
        setIsSearched(true);

    }

    return (
        <div className='container pt-13 2xl:px-20 mx-auto my-10  '>
            <div className='bg-gradient-to-tr from-green-400 via-teal-600 to-emerald-900
             border-gray-300 border-b shadow-2xl text-white text-center mx-2 py-16 rounded-xl'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
                <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>
                    Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities
                    and Take the First Step Toward Your Future!

                </p>
                <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-2xl pl-4 mx-4 sm:mx-auto'>
                    <div className='flex items-center'>
                        <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
                        <input type="text" placeholder='Search for jobs'
                            className='max-sm:text-xs p-2 rounded outline-none w-full'
                            ref={titleRef} />
                    </div>
                    <div className='flex items-center'>
                        <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
                        <input type="text" placeholder='Location'
                            className='max-sm:text-xs p-2 rounded outline-none w-full'
                            ref={locationRef} />
                    </div>
                    <button onClick={onSearch} className='bg-orange-500 px-8 py-2 rounded text-white m-1'>Search</button>

                </div>
            </div>

            <div className='border border-gray-300 shadow-2xl mx-2 mt-5 p-6 rounded-md flex'>
                <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
                    <p className='font-medium gap-3 flex'><Building className='text-orange-500' />Trusted by</p>
                    <img className='h-6' src={assets.microsoft_logo} alt="" />
                    <img className='h-6' src={assets.walmart_logo} alt="" />
                    <img className='h-6' src={assets.accenture_logo} alt="" />
                    <img className='h-6' src={assets.samsung_logo} alt="" />
                    <img className='h-6' src={assets.amazon_logo} alt="" />
                    <img className='h-6' src={assets.adobe_logo} alt="" />
                </div>
            </div>




        </div>
    )
}

export default Hero