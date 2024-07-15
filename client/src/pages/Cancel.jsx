import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import errorImg from '/error.jpg';

const Cancel = () => {
    return (
        <div className='flex justify-center items-center max-md:p-[10px]'>
            <div className='flex max-md:flex-col gap-[10px] items-center justify-center mt-[200px] border w-[800px] shadow-lg max-md:text-center'>
                <div>
                    <h3 className='font-semibold text-[30px]'>Is there anything wrong</h3>
                    <p className='pb-[20px]'>Please contact to the hotline if you have problem</p>
                    <Link to='/' className='border p-[10px]  rounded-[10px] bg-red-500 text-white'>Return to home page</Link>
                </div>
                <div className='w-[300px] h-[300px]'>
                    <img src={errorImg} alt="" className='w-full h-full object-cover' />
                </div>

            </div>
        </div>
    )
}

export default Cancel