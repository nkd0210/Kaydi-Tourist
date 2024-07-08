import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import Navbar from '../components/Navbar'
import { setPropertyList } from '../redux/user/userSlice';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { Favorite } from "@mui/icons-material";

const PropertyList = () => {
    const { currentUser } = useSelector((state) => state.user);
    const propertyList = currentUser.propertyList;

    const dispatch = useDispatch();

    const handleFetchPropertyList = async() => {
        const res = await fetch(`/api/user/property/${currentUser._id}`, {
            method: "GET"
        });
        const data = await res.json();
        if (!res.ok) {
            console.log("Fetching property list failed...")
            return;
        }else {
            dispatch(setPropertyList(data));
        }
    }

    useEffect(() => {
        handleFetchPropertyList();
    }, [currentUser])

  return (
    <div>
        <Navbar />
        <div className='mx-[100px] max-md:mx-0 my-[50px] max-md:my-[20px]'>
                <h2 className='text-center text-[30px] font-semibold mb-[50px]'>Your Creation Place</h2>
                <div className='flex flex-wrap gap-[50px]'>
                    {propertyList.map(({ _id, creator,listingPhotoPaths, city, province, country, category, type, price, booking = false }) => (
                        <ListingCard
                            key={_id}
                            listingId={_id}
                            creator={creator}
                            listingPhotoPaths={listingPhotoPaths}
                            city={city}
                            province={province}
                            country={country}
                            category={category}
                            type={type}
                            price={price}
                            booking={booking}
                        />
                    ))}
                </div>

            </div>
    </div>
  )
}

export default PropertyList