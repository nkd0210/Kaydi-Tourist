import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { signOutSuccess } from '../redux/user/userSlice'
import { FaRegUserCircle } from "react-icons/fa";
import Logo from '/Kaydi.png';

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);

    const [search, setSearch] = useState("")
    const [dropdownMenu, setDropdownMenu] = useState(false);

    const handleSignOut = async (e) => {
        e.preventDefault();

        const res = await fetch(`/api/auth/signout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await res.json();

        if (res.ok) {
            dispatch(signOutSuccess(data));
            setDropdownMenu(false);
            navigate('/');
        }
    }

    return (
        <div className='relative flex w-full justify-between items-center px-[20px] max-md:p-0'>
            {/* LOGO */}
            <a href="/" className='w-[120px] h-[100px]'>
                <img src="/Kaydi.png" alt="logo" className='w-full h-full' />
            </a>

            {/* SEARCH */}
            <div className='max-md:hidden border border-gray-500 rounded-[10px] px-[10px]'>
                <input
                    type="text"
                    placeholder="Search ..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='outline-none'
                />

                <IconButton>
                    <Search sx={{}} />
                </IconButton>

            </div>

            {/* RIGHT */}
            <div className='flex justify-center items-center text-center gap-[20px]'>
                {currentUser ? (
                    <Link to='/createPlace' className='max-md:hidden border border-gray-500 rounded-[20px] px-[20px] py-[10px]  hover:bg-gray-200'>Create your trip</Link>
                ) : (
                    <Link to='/signin' className='border border-gray-500 rounded-[20px] px-[20px] py-[10px] hover:bg-gray-200 '>Create your trip</Link>
                )}

                <button className=' flex border border-gray-500 rounded-[20px] p-[10px] gap-[10px] items-center justify-center' >
                    <Menu onClick={() => setDropdownMenu(!dropdownMenu)} />
                    {currentUser ? (
                        <div className='w-[40px] h-[40px] rounded-[50%] '>
                            <Link to='/profile'>
                                <img className='w-full h-full rounded-[50%] object-cover' src={currentUser.profilePic} alt="avatar" />
                            </Link>
                        </div>
                    ) : (
                        <Person className='text-[20px]' />
                    )}
                </button>

                {dropdownMenu && !currentUser && (
                    <div className='absolute right-[20px] max-md:right-[10px] top-[80px] max-md:top-[80px]  w-[100px]  border shadow-lg rounded-[10px] flex flex-col z-20'>
                        <Link to='signin' className='bg-gray-100 border-b-[1px] border-gray-400 hover:bg-gray-200 rounded-t-[10px] py-[5px]'>Sign In</Link>
                        <Link to='signup' className='bg-gray-100 hover:bg-gray-200 rounded-b-[10px] py-[5px]'>Sign Up</Link>
                    </div>
                )}

                {dropdownMenu && currentUser && (
                    <div className='absolute right-[20px] max-md:right-[10px] top-[90px] max-md:top-[90px] border shadow-lg rounded-[10px] flex flex-col z-30 '>
                        <Link className=' bg-gray-100 border-b-[1px] border-gray-400 p-[8px] hover:bg-gray-200 rounded-t-[10px]'>Message</Link>
                        <Link to={`/trip/${currentUser._id}`} className=' bg-gray-100 border-b-[1px] border-gray-400 p-[8px] hover:bg-gray-200'>Booked Trip</Link>
                        <Link to={`/wishlist/${currentUser._id}`} className=' bg-gray-100 border-b-[1px] border-gray-400 p-[8px] hover:bg-gray-200'>Favorite Trip</Link>
                        <Link to={`/propertylist/${currentUser._id}`} className=' bg-gray-100 border-b-[1px] border-gray-400 p-[8px] hover:bg-gray-200'>Your Trip</Link>
                        <Link to={`/reservationlist/${currentUser._id}`} className=' bg-gray-100 border-b-[1px] border-gray-400 p-[8px] hover:bg-gray-200'>Customer booked</Link>
                        <Link to='/createPlace' className='bg-gray-100 border-b-[1px] border-gray-400 p-[8px] hover:bg-gray-200'>Create your trip</Link>
                        <Link className='bg-gray-100 p-[8px] hover:bg-gray-200 rounded-b-[10px] text-red-400' onClick={handleSignOut}>Log out</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar