import React from 'react'
import { assets } from '../assets/assets'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
    return (
        <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
            <img width={160} src={assets.logo} alt="" />
            <p className='flex-1 border-l border-gray-400 font-bold pl-4 text-md  max-sm:hidden'>
                Copyright <span className='text-red-500'> @Hunter-Dev</span> Inc | All Rights Reserved.
            </p>
            <div className='flex gap-2.5'>
                <Facebook width={35} height={35} className='rounded text-blue-500 cursor-pointer border border-gray-400' />
                <Instagram width={35} height={35} className='rounded text-red-500 cursor-pointer border border-gray-400' />
                <Linkedin width={35} height={35} className='rounded text-blue-500 cursor-pointer border border-gray-400' />
                <Twitter width={35} height={35} className='rounded text-sky-500 cursor-pointer border border-gray-400' />
            </div>
        </div>
    )
}

export default Footer