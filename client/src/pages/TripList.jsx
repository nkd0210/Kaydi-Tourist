import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { setTripList } from '../redux/user/userSlice';

import { Favorite } from "@mui/icons-material";

const TripList = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const [tripLists, setTripLists] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleFetchTripList = async () => {
        try {
            const res = await fetch(`/api/user/trip/${currentUser._id}`, {
                method: "GET"
            });
            const data = await res.json();
            if (!res.ok) {
                console.log("Fetching trip list failed...")
            } else {
                setTripLists(data);
                dispatch(setTripList(data));
            }
        } catch (error) {
            console.log("Fetching trip list failed")
        }
    }

    useEffect(() => {
        handleFetchTripList();
    }, [currentUser])

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    return (
        <div>
            <Navbar />
            <div className='mx-[100px] max-md:mx-0 my-[50px] max-md:my-[20px]'>
                <h2 className='text-center text-[30px] font-semibold mb-[50px]'>Your Trip List</h2>
                <div className='flex flex-wrap gap-[50px]'>
                    {tripLists.map((trip, index) => (
                        <Link key={index} to={`/detailplace/${trip.listingId._id}`}>
                            <div className='relative mb-[100px]'>
                                {/* IMAGE */}
                                <div className=' w-[300px] h-[200px]'>
                                    <Slider {...settings}>
                                        {trip.listingId?.listingPhotoPaths.map((photo, index) => (
                                            <div key={index} className='w-[300px] h-[200px]'>
                                                <img src={photo} alt="" className='w-full h-full object-cover' />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>

                                <Favorite className='absolute top-[10px] right-[10px] text-[20px] text-white cursor-pointer' />

                                {/* INFORMATION */}
                                <h3 className='text-[16px] font-semibold'>
                                    {trip.listingId?.city}, {trip.listingId?.province}, {trip.listingId?.country}
                                </h3>

                                <p className='text-[16px] '>{trip.listingId?.category}</p>
                                <div>
                                    <p>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                                    <p>${trip.totalPrice} total</p>

                                </div>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TripList