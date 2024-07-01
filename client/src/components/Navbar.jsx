import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { signOutSuccess } from '../redux/user/userSlice'
import { FaRegUserCircle } from "react-icons/fa";

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
        <div className='relative flex w-full justify-between p-[20px]'>
            {/* LOGO */}
            <a href="/" className='w-[100px] h-[50px]'>
                <img src="/assets/logo.png" alt="logo" className='w-full h-full' />
            </a>

            {/* SEARCH */}
            <div className='border border-gray-500 rounded-[10px] p-[10px]'>
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
                    <Link to='/create-listing' className='border border-gray-500 rounded-[20px] p-[20px] hover:bg-gray-200 '>Become A Host</Link>
                ) : (
                    <Link to='/signin' className='border border-gray-500 rounded-[20px] p-[20px] hover:bg-gray-200 '>Become A Host</Link>
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
                    <div className='absolute right-[20px] top-[74px]  w-[100px]  border border-gray-500 rounded-[10px] flex flex-col'>
                        <Link to='signin' className='border-b-[1px] border-gray-400 hover:bg-gray-100 rounded-t-[10px]'>Sign In</Link>
                        <Link to='signup' className='hover:bg-gray-100 rounded-b-[10px]'>Sign Up</Link>
                    </div>
                )}

                {dropdownMenu && currentUser && (
                    <div className='absolute right-[20px] top-[82px] border border-gray-500 rounded-[10px] flex flex-col'>
                        <Link className='border-b-[1px] border-gray-400 p-[8px] hover:bg-gray-100 rounded-t-[10px]'>Trip List</Link>
                        <Link className='border-b-[1px] border-gray-400 p-[8px] hover:bg-gray-100'>Wish List</Link>
                        <Link className='border-b-[1px] border-gray-400 p-[8px] hover:bg-gray-100'>Property List</Link>
                        <Link className='border-b-[1px] border-gray-400 p-[8px] hover:bg-gray-100'>Reservation List</Link>
                        <Link className='border-b-[1px] border-gray-400 p-[8px] hover:bg-gray-100'>Become A Host</Link>
                        <Link className='p-[8px] hover:bg-gray-100 rounded-b-[10px]' onClick={handleSignOut}>Log out</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar