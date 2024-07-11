import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { setWishList } from '../redux/user/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Favorite } from "@mui/icons-material";

const ListingCard = ({ listingId, creator, listingPhotoPaths, city, province, country, category, type, price, startDate, endDate, totalPrice, booking, }) => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const wishList = currentUser?.wishList || [];
    const isLiked = wishList?.find((item) => item?._id === listingId);

    const handleShowErrorMessage = (message) => {
        toast.error(message)
    }

    const handleAddToWishList = async () => {
        if (currentUser?._id === creator._id) {
            handleShowErrorMessage("You can't add your creation");
            return;
        } else {
            const res = await fetch(`/api/user/trip/${currentUser?._id}/${listingId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
                return;
            } else {
                dispatch(setWishList(data.wishList));
            }
        }
    }

    const handleClickHeart = (e) => {
        e.stopPropagation();
        handleAddToWishList();
    }

    return (
        <Wrapper>
            <ToastContainer />
            {currentUser ? (
                <div onClick={() => { navigate(`/detailplace/${listingId}`) }} className='relative mb-[100px] w-[400px] h-[350px] overflow-x-hidden border rounded-[10px] shadow-lg '>
                    {/* IMAGE */}
                    <div className=' w-[400px] h-[200px]'>
                        <Slider {...settings}>
                            {listingPhotoPaths.map((photo, index) => (
                                <div key={index} className='w-[400px] h-[200px]'>
                                    <img src={photo} alt="" className='w-full h-full object-cover' />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <button type='button' onClick={handleClickHeart} disabled={!currentUser} className='absolute top-[10px] right-[10px]'>
                        {isLiked ? (
                            <Favorite className='text-red-400 text-[20px] cursor-pointer' />
                        ) : (
                            <Favorite className='text-white text-[20px] cursor-pointer' />
                        )}
                    </button>

                    {/* INFORMATION */}
                    <div className='p-[10px]'>
                        <div className='flex gap-[5px] mb-[2px]'>
                            <span className='font-semibold'>Location: </span>
                            <h3>
                                {city}, {province}, {country}
                            </h3>
                        </div>

                        <div className='flex gap-[5px] mb-[2px]'>
                            <span className='font-semibold'>Category: </span>
                            <p className='text-[16px] '>{category}</p>
                        </div>
                        <div className='flex gap-[5px] mb-[2px]'>
                            <span className='font-semibold'>Type: </span>
                            <p>{type}</p>
                        </div>
                        <div className='flex gap-[5px]'>
                            <span className='font-semibold'>Cost: </span>
                            <p>${price} / night</p>
                        </div>
                    </div>


                </div>

            ) : (
                <Link to='/signin'>
                    <div className='relative mb-[100px]'>
                        {/* IMAGE */}
                        <div className=' w-[300px] h-[200px]'>
                            <Slider {...settings}>
                                {listingPhotoPaths.map((photo, index) => (
                                    <div key={index} className='w-[300px] h-[200px]'>
                                        <img src={photo} alt="" className='w-full h-full object-cover' />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <button type='button' onClick={handleClickHeart} disabled={!currentUser} className='absolute top-[10px] right-[10px]'>
                            <Favorite className={`text-white text-[20px] cursor-pointer`} />
                        </button>

                        {/* INFORMATION */}
                        <h3 className='text-[16px] font-semibold'>
                            {city}, {province}, {country}
                        </h3>

                        <p className='text-[16px] '>{category}</p>
                        <div>
                            <p>{type}</p>
                            <p><span className='font-semibold'>${price} </span>per night</p>
                        </div>

                    </div>
                </Link>
            )}

        </Wrapper>
    )
}

const Wrapper = styled.section`


`

export default ListingCard