import React from 'react'
// import { categories } from '../data.js'
import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom';

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

const Categories = () => {

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

    return (
        <Wrapper>
            <div className='p-[20px] max-md:p-0 flex flex-col justify-center items-center text-center gap-[20px]'>
                <div className=' flex flex-col justify-center items-center text-center gap-[20px]'>
                    <h1 className='text-[30px] font-semibold text-slate-700'>Explore Top Categories</h1>
                    <p className='w-[600px] max-md:w-full text-[18px]'>Explore our wide range of vacation rentals that cater to all types of travelers. Immerse yourself in the local culture, enjoy the comforts of home, and create unforgettable memoreis in your dream destination.</p>
                </div>

                <div className='body'>
                    {categories?.slice(1, 10).map((category, index) => (
                        <div key={index} className='shadow-lg rounded-[10px]'>
                            <Link to=''>
                                <div className='flex flex-col justify-center items-center bg-gray-300 py-[10px] rounded-t-[10px] gap-[5px]'>
                                    <div className='text-[20px]'>{category.icon}</div>
                                </div>
                                <div className='h-[200px] overflow-hidden'>
                                    <img src={category.img} alt={category.label} className='picture w-full h-full object-cover' />
                                </div>
                                <div className='flex flex-col justify-center items-center bg-blue-200 py-[10px] rounded-b-[10px] gap-[5px]'>
                                    <p className='uppercase font-semibold'>{category.label}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    .body {
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 20px;
        margin-top: 20px;
    }
    .picture {
        transition: transform 0.3s ease-in-out;
    }
    .picture:hover {
        transform: scale(1.5);
    }

    @media (max-width: 768px) {
        .body {
            grid-template-columns: 1fr;
        }
    }
`

export default Categories