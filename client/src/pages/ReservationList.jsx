import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import Navbar from '../components/Navbar'
import { setReservationList } from '../redux/user/userSlice';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ReservationList = () => {

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
    const reservationList = currentUser.reservationList;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFetchReservationList = async () => {
        const res = await fetch(`/api/user/reservation/${currentUser._id}`, {
            method: "GET"
        });
        const data = await res.json();
        if (!res.ok) {
            console.log("Fetching reservation list failed...")
            return;
        } else {
            dispatch(setReservationList(data));
        }
    }

    useEffect(() => {
        handleFetchReservationList();
    }, [])


    return (
        <div>
            <Navbar />
            <div className='mx-[100px] max-md:mx-0 my-[50px] max-md:my-[20px]'>
                <h2 className='text-center text-[30px] font-semibold mb-[50px]'>Your Customer Booked Trip</h2>
                <div className='flex flex-wrap gap-[50px]'>
                    {reservationList.map((trip, index) => (

                        <div key={index} onClick={() => navigate(`/detailplace/${trip.listingId._id}`)} className='w-[400px]'>
                            <div className='relative mb-[100px] border rounded-[10px] shadow-lg bg-gray-50'>
                                {/* IMAGE */}
                                <div className='  w-[400px] h-[200px]'>
                                    <Slider {...settings}>
                                        {trip.listingId?.listingPhotoPaths.map((photo, index) => (
                                            <div key={index} className='w-[300px] h-[200px]'>
                                                <img src={photo} alt="" className='w-full h-full object-cover rounded-t-[10px]' />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>

                                {/* INFORMATION */}
                                <div className='p-[10px]'>
                                    <div className='flex gap-[10px]'>
                                        <span className='font-semibold'>Location:</span>
                                        <h3 >
                                            {trip.listingId?.city}, {trip.listingId?.province}, {trip.listingId?.country}
                                        </h3>
                                    </div>

                                    <div className='flex gap-[10px]'>
                                        <span className='font-semibold'>Category:</span>
                                        <p>{trip.listingId?.category}</p>
                                    </div>
                                    <div>
                                        <p>
                                            <span className='font-semibold'>Customer: </span>
                                            {trip.customerId?.username}
                                        </p>
                                        <p>
                                            <span className='font-semibold'>Date: </span>
                                            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                                        </p>
                                        <p>
                                            <span className='font-semibold'>Total price: </span>
                                            ${trip.totalPrice}
                                        </p>

                                    </div>
                                </div>

                                <button type='button' disabled={!currentUser} onClick={(e) => { e.stopPropagation(); }} className='border w-[120px] rounded-[10px] p-[10px] my-[10px] ml-[10px] text-center bg-red-400 hover:opacity-70 hover:text-white'>
                                    Report
                                </button>

                            </div>
                        </div>

                    ))}
                </div>

            </div>
        </div>
    )
}

export default ReservationList