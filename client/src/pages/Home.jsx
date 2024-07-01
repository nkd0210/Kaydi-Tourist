import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice';

import Navbar from '../components/Navbar';


const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, error: errorMessage } = useSelector(state => state.user);

  // console.log(currentUser)

  const handleSignOut = async (e) => {
    e.preventDefault();
    
    const res = await fetch(`/api/auth/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await res.json();

    if(res.ok) {
      dispatch(signOutSuccess(data));
      navigate('/');
    }
  }

  return (
    <>
      <Navbar />
      Home
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  )
}

export default Home