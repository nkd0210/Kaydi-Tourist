import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import successImg from '/success.png';

const Success = () => {
    return (
        <div className='flex justify-center items-center max-md:p-[10px]'>
            <div className='flex max-md:flex-col gap-[10px] items-center justify-center mt-[200px] border w-[800px] shadow-lg max-md:text-center'>
                <div>
                    <h3 className='font-semibold text-[30px]'>Payment successful</h3>
                    <p className='pb-[20px]'>Thank you for choosing Kaydi Tourist, enjoy your trip !</p>
                    <Link to='/' className='border p-[10px]  rounded-[10px] bg-green-500 text-white'>Return to home page</Link>
                </div>
                <div className='w-[300px] h-[300px]'>
                    <img src={successImg} alt="" className='w-full h-full object-cover'/>
                </div>

            </div>
        </div>
    )
}

export default Success