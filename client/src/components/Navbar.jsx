import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";



const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);

    const [search, setSearch] = useState("")
    const [dropdownMenu, setDropdownMenu] = useState(false);


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
                    <Link to='/create-listing'>Become A Host</Link>
                ) : (
                    <Link to='/signin'>Become A Host</Link>
                )}

                <button className=' flex border border-gray-500 rounded-[20px] p-[10px] gap-[10px] items-center justify-center' >
                    <Menu onClick={() => setDropdownMenu(!dropdownMenu)} />
                    {currentUser ? (
                        <div className='w-[40px] h-[40px] rounded-[50%] border'>
                            <img className='w-full h-full rounded-[50%] object-cover' src={currentUser.profilePic} alt="avatar" />
                        </div>
                    ) : (
                        <Person className='text-[20px]' />
                    )}
                </button>

                {dropdownMenu && !currentUser && (
                    <div className='absolute right-[20px] top-[74px]  w-[100px]  border border-gray-500 rounded-[10px] flex flex-col'>
                        <Link to='signin' className='border-b-[1px] border-gray-400'>Sign In</Link>
                        <Link to='signup'>Sign Up</Link>
                    </div>
                )}

                {dropdownMenu && currentUser && (
                    <div className='absolute right-[20px] top-[82px] border border-gray-500 rounded-[10px] flex flex-col'>
                        <Link className='border-b-[1px] border-gray-400 p-[8px]'>Trip List</Link>
                        <Link className='border-b-[1px] border-gray-400 p-[8px]'>Wish List</Link>
                        <Link className='border-b-[1px] border-gray-400 p-[8px]'>Property List</Link>
                        <Link className='border-b-[1px] border-gray-400 p-[8px]'>Reservation List</Link>
                        <Link className='p-[8px]'>Become A Host</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar