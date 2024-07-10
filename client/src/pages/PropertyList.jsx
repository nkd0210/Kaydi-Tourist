import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import ListingCard from '../components/ListingCard';
import Navbar from '../components/Navbar'
import { setPropertyList } from '../redux/user/userSlice';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const PropertyList = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    const { currentUser } = useSelector((state) => state.user);
    const propertyList = currentUser.propertyList;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFetchPropertyList = async () => {
        const res = await fetch(`/api/user/property/${currentUser._id}`, {
            method: "GET"
        });
        const data = await res.json();
        if (!res.ok) {
            console.log("Fetching property list failed...")
            return;
        } else {
            dispatch(setPropertyList(data));
        }
    }

    useEffect(() => {
        handleFetchPropertyList();
    }, []);


    return (
        <div>
            <Navbar />
            <div className='mx-[100px] max-md:mx-0 my-[50px] max-md:my-[20px]'>
                <h2 className='text-center text-[30px] font-semibold mb-[50px]'>Your Upload Trip</h2>
                <div className='flex flex-wrap gap-[50px]'>
                    {propertyList.map((trip, index) => (
                        <div key={index} onClick={() => navigate(`/detailplace/${trip._id}`)} className='w-[400px]'>
                            <div className='relative mb-[100px] border rounded-[10px] shadow-lg bg-gray-50'>

                                {/* IMAGE */}
                                <div className=' w-[400px] h-[200px]'>
                                    <Slider {...settings}>
                                        {trip?.listingPhotoPaths.map((photo, index) => (
                                            <div key={index} className='w-[400px] h-[200px]'>
                                                <img src={photo} alt="" className='w-full h-full object-cover rounded-t-[10px]' />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>

                                {/* INFORMATION */}
                                <div className='p-[10px]'>
                                    <div className='flex gap-[10px]'>
                                        <span className='font-semibold'>Location: </span>
                                        <p>
                                            {trip?.city}, {trip?.province}, {trip?.country}
                                        </p>
                                    </div>
                                    <div className='flex gap-[10px]'>
                                        <span className='font-semibold'>Type:</span>
                                        <p className='text-[16px] '>{trip?.category}</p>
                                    </div>
                                    <div className='flex gap-[10px]'>
                                        <span className='font-semibold'>Owner:</span>
                                        <p className='text-[16px] '>{trip?.creator.username}</p>
                                    </div>
                                    <div className='flex gap-[10px]'>
                                        <span className='font-semibold'>Cost: </span>
                                        <p>${trip.price}/night</p>
                                    </div>
                                </div>

                                <button type='button' disabled={!currentUser} onClick={(e) => { e.stopPropagation(); navigate(`/update/${trip._id}`) }} className='border w-[120px] rounded-[10px] p-[10px] my-[10px] ml-[10px] text-center bg-red-400 hover:opacity-70 hover:text-white'>
                                    Update trip
                                </button>
                                <button type='button' disabled={!currentUser} onClick={(e) => { e.stopPropagation(); navigate(`/statistic/${trip._id}`) }} className='border w-[120px] rounded-[10px] p-[10px] my-[10px] ml-[10px] text-center bg-blue-400 hover:opacity-70 hover:text-white'>
                                    Statistic
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default PropertyList