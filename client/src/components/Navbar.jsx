import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <img src={assets.logo} alt="" />
                <div>
                    <button>Recruiter Login</button>
                    <button>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar