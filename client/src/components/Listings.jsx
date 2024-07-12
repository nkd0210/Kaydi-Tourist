import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ListingCard from './ListingCard';
import Loader from './Loader';


// CAROUSEL
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// ICON
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { FaSkiing, FaPumpSoap, FaShower, FaFireExtinguisher, FaUmbrellaBeach, FaKey } from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import { BiSolidWasher, BiSolidDryer, BiSolidFirstAid, BiWifi, BiSolidFridge, BiWorld } from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import { PiBathtubFill, PiCoatHangerFill, PiTelevisionFill } from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import { GiHeatHaze, GiCctvCamera, GiBarbecue, GiToaster, GiCampfire } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
// REDUX STATE
import { setListings, setListingsStart } from '../redux/user/userSlice';

const Listings = () => {

    const categories = [
        {
            label: "All",
            icon: <BiWorld />,
        },
        {
            img: "assets/beach_cat.jpg",
            label: "Beachfront",
            icon: <TbBeach />,
            description: "This property is close to the beach!",
        },
        {
            img: "assets/windmill_cat.webp",
            label: "Windmills",
            icon: <GiWindmill />,
            description: "This property is has windmills!",
        },
        {
            img: "assets/modern_cat.webp",
            label: "Iconic cities",
            icon: <MdOutlineVilla />,
            description: "This property is modern!",
        },
        {
            img: "assets/countryside_cat.webp",
            label: "Countryside",
            icon: <TbMountain />,
            description: "This property is in the countryside!",
        },
        {
            img: "assets/pool_cat.jpg",
            label: "Amazing Pools",
            icon: <TbPool />,
            description: "This is property has a beautiful pool!",
        },
        {
            img: "assets/island_cat.webp",
            label: "Islands",
            icon: <GiIsland />,
            description: "This property is on an island!",
        },
        {
            img: "assets/lake_cat.webp",
            label: "Lakefront",
            icon: <GiBoatFishing />,
            description: "This property is near a lake!",
        },
        {
            img: "assets/skiing_cat.jpg",
            label: "Ski-in/out",
            icon: <FaSkiing />,
            description: "This property has skiing activies!",
        },
        {
            img: "assets/castle_cat.webp",
            label: "Castles",
            icon: <GiCastle />,
            description: "This property is an ancient castle!",
        },
        {
            img: "assets/cave_cat.jpg",
            label: "Caves",
            icon: <GiCaveEntrance />,
            description: "This property is in a spooky cave!",
        },
        {
            img: "assets/camping_cat.jpg",
            label: "Camping",
            icon: <GiForestCamp />,
            description: "This property offers camping activities!",
        },
        {
            img: "assets/arctic_cat.webp",
            label: "Arctic",
            icon: <BsSnow />,
            description: "This property is in arctic environment!",
        },
        {
            img: "assets/desert_cat.webp",
            label: "Desert",
            icon: <GiCactus />,
            description: "This property is in the desert!",
        },
        {
            img: "assets/barn_cat.jpg",
            label: "Barns",
            icon: <GiBarn />,
            description: "This property is in a barn!",
        },
        {
            img: "assets/lux_cat.jpg",
            label: "Luxury",
            icon: <IoDiamond />,
            description: "This property is brand new and luxurious!",
        },
    ];

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8,
        nextArrow: false,
        prevArrow: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
        ]
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { listings } = useSelector((state) => state.user);

    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const fetchListing = async () => {
        dispatch(setListingsStart());
        const res = await fetch(
            selectedCategory !== 'All' ? `/api/listing/getlisting?category=${selectedCategory}` : `/api/listing/getlisting`,
            {
                method: "GET"
            }
        );
        const data = await res.json();

        if (!res.ok) {
            console.log("Fetching listing failed...")
        } else {
            // console.log(data);
            dispatch(setListings(data));
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchListing();
    }, [selectedCategory])


    return (
        <Wrapper>

            {/* CATEGORY CHOICE */}
            <div className='py-[50px] px-[80px]'>
                <Slider {...settings}>
                    {categories.map((category, index) => (
                        <div key={index} onClick={() => setSelectedCategory(category.label)}>
                            <div className={`${category.label === selectedCategory ? 'border-red-500 bg-red-100 shadow-lg' : ''} flex flex-col justify-center items-center border rounded-[20px] p-[5px] cursor-pointer`}>
                                <div>{category.icon}</div>
                                <div>{category.label}</div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* LISTINGS */}
            {loading ? (
                <div className="mt-[50px]" >
                    <Loader />
                </div>
            ) : (

                <div className='flex flex-wrap justify-center items-center gap-[50px] max-md:gap-[10px] mx-[80px]'>
                    {listings?.map(({
                        _id,
                        creator,
                        listingPhotoPaths,
                        city,
                        province,
                        country,
                        category,
                        type,
                        price,
                        booking = false
                    }) => (
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
                            booking={booking} />
                    ))}
                </div>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.section`

`

export default Listings