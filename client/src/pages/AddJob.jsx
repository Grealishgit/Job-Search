import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
import { ChartColumnIncreasing, MapPin, UsersRound } from 'lucide-react';
import Footer from '../components/Footer';

const AddJob = () => {

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Nairobi');
    const [category, setCategory] = useState('Programming')
    const [level, setLevel] = useState('Beginner Level');
    const [salary, setSalary] = useState(0);

    const editoRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        //Initaite Quill Only once
        if (!quillRef.current && editoRef.current) {
            quillRef.current = new Quill(editoRef.current, {
                theme: 'snow'
            })
        }
    }, [])

    return (
        <form className='container p-4 flex flex-col w-full items-start gap-3'>
            <div className='w-full'>
                <p className='mb-2'>Job Title</p>
                <input type="text" required placeholder='Type here'
                    value={title} onChange={(e) => setTitle(e.target.value)}
                    className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
                />
            </div>

            <div className='w-full max-w-lg mb-3'>
                <p className='my-2' >Job Description</p>
                <div ref={editoRef}>

                </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

                <div>
                    <p className='mb-2 font-semibold flex gap-2'> <UsersRound className='text-blue-500' /> Job Category</p>
                    <select className='w-full px-3 py-2 border border-gray-300 rounded' onChange={e => setCategory(e.target.value)}>
                        {JobCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <p className='mb-2 font-semibold flex gap-2'> <MapPin className='text-red-500' /> Job Location</p>
                    <select className='w-full px-3 py-2 border border-gray-300 rounded' onChange={e => setLocation(e.target.value)}>
                        {JobLocations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <p className='mb-2 font-semibold flex gap-2'>Job Level <ChartColumnIncreasing className='text-green-500' /> </p>
                    <select className='w-full px-3 py-2 border border-gray-300 rounded' onChange={e => setLevel(e.target.value)}>
                        <option value="Beginner Level">Beginner Level</option>
                        <option value="Junior Level">Junior Level</option>
                        <option value="Intermediate Level">Intermediate Level</option>
                        <option value="Senior Level">Senior Level</option>
                        <option value="Expert Level">Expert Level</option>
                    </select>
                </div>

            </div>
            <div>
                <p className='mt-2 font-bold'>Salary</p>
                <input min={0} className='w-full px-4 py-2 border-2 border-gray=300 rounded sm:w-[120px]' onChange={e => setSalary(e.target.value)} type="number" placeholder='0' />
                <button className='md:w-28 w-full  md:ml-8 py-2 mt-4 font-semibold bg-teal-500 text-white rounded cursor-pointer'>ADD JOB</button>
            </div>



        </form>
    )
}

export default AddJob