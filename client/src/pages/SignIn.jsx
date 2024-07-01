import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// ICON
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
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';


const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: errorMessage } = useSelector(state => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleShowErrorMessage = (message) => {
    toast.error(message)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || formData.email === "" || formData.password === "") {
      dispatch(signInFailure("Please fill all the fields"));
      handleShowErrorMessage("Please fill all the fields");
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure("Invalid email or password"));
        handleShowErrorMessage("Invalid email or password");
        return;
      } else {
        dispatch(signInSuccess(data));
        navigate('/');
      }

    } catch (error) {
      dispatch(signInFailure(error.message))
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
              <TfiEmail className='text-gray-400 mx-[10px]' />
              <input
                onChange={handleChange}
                id='email'
                type="email"
                placeholder='Email'
                className=' outline-none bg-transparent w-full backdrop-blur-sm '
              />
            </div>

            <div className='w-3/4 max-md:w-full border border-blue-300 rounded-[20px] flex justify-between items-center text-center gap-[10px] p-[5px] '>
              <div className='flex items-center'>
                <RiLockPasswordLine className='text-gray-400 mx-[10px] text-[20px]' />
                <input
                  onChange={handleChange}
                  id='password'
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

            <button type='submit' className='w-3/4 max-md:w-full border-blue-300 border rounded-[20px] p-[5px] bg-blue-300 text-white hover:bg-opacity-70 hover:text-black'>
              Sign In
            </button>

            <hr className='w-3/4 max-md:w-full bg-gray-300 h-[2px]' />

            <button type='submit' className='w-3/4 max-md:w-full border-blue-300 border rounded-[20px] p-[5px] bg-blue-300 text-white hover:bg-opacity-70 hover:text-black'>
              Sign in with Google
            </button>

            <div className='text-gray-500 max-md:text-white flex gap-[10px] backdrop-blur-sm'>
              Don't have any account ?
              <Link to='/signup'>Sign Up</Link>
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

export default SignIn