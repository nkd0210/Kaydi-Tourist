import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// ICON
import { HiOutlineUser } from "react-icons/hi2";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
// IMAGE
import girlCamera from '/assets/girlCamera.jpg';
import boyCamera from '/assets/boyCamera.jpg';
import Photographer3 from '/assets/photographer3.jpg';
import Photographer4 from '/assets/photographer4.jpg';
import Photographer5 from '/assets/photographer5.jpg';
import { signUpFailure, signUpStart, signUpSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);
    const [formData, setFormData] = useState({});
    const [confirmPwd, setConfirmPwd] = useState('');

    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleShowConfirmPwd = (e) => {
        e.preventDefault();
        setShowConfirmPwd(!showConfirmPwd);
    }

    const handleConfirmPwd = (e) => {
        setConfirmPwd(e.target.value);
    }

    const handleShowErrorMessage = (message) => {
        toast.error(message)
    }

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            dispatch(signUpFailure("All fields are required"));
            handleShowErrorMessage("All fields are required");
            return;
        }

        if (formData.password !== confirmPwd) {
            dispatch(signUpFailure("Passwords do not match"));
            handleShowErrorMessage("Passwords do not match");
            return;
        }
        dispatch(signUpStart());
        try {
            const res = await fetch(`/api/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();

            if (!res.ok) {
                dispatch(signUpFailure(data.message));
                handleShowErrorMessage(data.message);
                return;
            } else {
                navigate('/signin');
            }

        } catch (error) {
            dispatch(signUpFailure(error.message))
        }
    }


    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <ToastContainer />
            <div className='w-3/4 h-[500px] rounded-[10px] flex gap-[20px]'>

                <div className='w-1/2 max-md:w-full bg-gray-100 max-md:bg-laptop max-md:bg-cover border border-gray-300 rounded-[10px] text-black max-md:text-white backdrop-blur-sm text-center p-[10px]'>
                    <h1 className='text-[20px] font-semibold pb-[30px] '>Welcome to Kaydi Tourist</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-[20px] justify-center items-center'>

                        <div className='w-3/4 max-md:w-full border border-blue-300 rounded-[20px] flex items-center text-center gap-[10px] p-[5px] '>
                            <HiOutlineUser className='text-gray-400 mx-[10px]  ' />
                            <input
                                id='username'
                                onChange={handleChange}
                                type="text"
                                placeholder='Username'
                                className='outline-none bg-transparent w-full backdrop-blur-sm'
                            />
                        </div>

                        <div className='w-3/4 max-md:w-full border border-blue-300 rounded-[20px] flex items-center text-center gap-[10px] p-[5px] '>
                            <TfiEmail className='text-gray-400 mx-[10px]' />
                            <input
                                id='email'
                                onChange={handleChange}
                                type="email"
                                placeholder='Email'
                                className=' outline-none bg-transparent w-full backdrop-blur-sm '
                            />
                        </div>

                        <div className='w-3/4 max-md:w-full border border-blue-300 rounded-[20px] flex justify-between items-center text-center gap-[10px] p-[5px] '>
                            <div className='flex items-center'>
                                <RiLockPasswordLine className='text-gray-400 mx-[10px] text-[20px]' />
                                <input
                                    id='password'
                                    onChange={handleChange}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    className='mx-[10px] outline-none bg-transparent w-full backdrop-blur-sm'
                                />
                            </div>
                            <button onClick={handleShowPassword} className='mx-[10px]'>
                                {showPassword ? (
                                    <FaRegEyeSlash className='text-gray-400' />
                                ) : (
                                    <FaRegEye className='text-gray-400' />
                                )}
                            </button>
                        </div>

                        <div className='w-3/4 max-md:w-full border border-blue-300 rounded-[20px] flex justify-between items-center text-center gap-[10px] p-[5px] '>
                            <div className='flex items-center'>
                                <RiLockPasswordLine className='text-gray-400 mx-[10px] text-[20px]' />
                                <input
                                    onChange={handleConfirmPwd}
                                    type={showConfirmPwd ? 'text' : 'password'}
                                    placeholder='Confirm password'
                                    className='mx-[10px] outline-none bg-transparent w-full backdrop-blur-sm'
                                />
                            </div>
                            <button onClick={handleShowConfirmPwd} className='mx-[10px]'>
                                {showConfirmPwd ? (
                                    <FaRegEyeSlash className='text-gray-400' />
                                ) : (
                                    <FaRegEye className='text-gray-400' />
                                )}
                            </button>
                        </div>

                        <button type='submit' className='w-3/4 max-md:w-full border-blue-300 border rounded-[20px] p-[5px] bg-blue-300 text-white hover:bg-opacity-70 hover:text-black'>
                            Sign Up
                        </button>

                        <hr className='w-3/4 max-md:w-full bg-gray-300 h-[2px]' />

                        <OAuth />

                        <div className='text-gray-500 max-md:text-white flex gap-[10px] backdrop-blur-sm'>
                            Already have an account ?
                            <Link to='/signin'>Login</Link>
                        </div>

                    </form>
                </div>

                <div className='relative max-md:hidden w-1/2 rounded-[10px] bg-laptop bg-cover text-white p-[10px]'>
                    <div className='absolute w-[95%] bg-gray-400 bg-opacity-20 rounded-[10px] h-[100px] bottom-[10px] left-1/2 transform -translate-x-1/2 backdrop-blur-sm flex justify-between items-center  '>
                        {/* IMAGE */}
                        <div className='avatar flex items-center'>
                            <div className=' absolute left-[20px] w-[50px] h-[50px] rounded-[50%]'>
                                <img src={girlCamera} alt="" className='w-full h-full rounded-[50%] object-cover' />
                            </div>
                            <div className=' absolute left-[60px] w-[50px] h-[50px] rounded-[50%]'>
                                <img src={Photographer3} alt="" className='w-full h-full rounded-[50%] object-cover' />
                            </div>
                            <div className=' absolute left-[100px] w-[50px] h-[50px] rounded-50%'>
                                <img src={boyCamera} alt="" className='w-full h-full rounded-[50%] object-cover' />
                            </div>
                            <div className=' absolute left-[140px] w-[50px] h-[50px] rounded-50%'>
                                <img src={Photographer4} alt="" className='w-full h-full rounded-[50%] object-cover' />
                            </div>
                            <div className=' absolute left-[180px] w-[50px] h-[50px] rounded-50%'>
                                <img src={Photographer5} alt="" className='w-full h-full rounded-[50%] object-cover' />
                            </div>
                        </div>

                        {/* TITLE */}
                        <div>
                            <h2 className=' font-semibold text-[20px]'>Join with 20k+ Users!</h2>
                            <p>Let's see our happy customer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp