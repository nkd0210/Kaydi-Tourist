import React from 'react'
import styled from 'styled-components'

import { useNavigate, Link } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import {Favorite} from "@mui/icons-material";
import { FaRegHeart } from "react-icons/fa";

const ListingCard = ({ listing, index }) => {
    const { _id, creator, listingPhotoPaths, city, province, country, category, type, price } = listing;

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Wrapper>
            <Link to={`/detailplace/${_id}`}>
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

                    <Favorite  className='absolute top-[10px] right-[10px] text-[20px] text-white cursor-pointer'/>

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
        </Wrapper>
    )
}

const Wrapper = styled.section`


`

export default ListingCard