import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from 'react-date-range';

import Loader from '../components/Loader';
// TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// CAROUSEL
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// ICON
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { FaSkiing, FaPumpSoap, FaShower, FaFireExtinguisher, FaUmbrellaBeach, FaKey } from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import { BiSolidWasher, BiSolidDryer, BiSolidFirstAid, BiWifi, BiSolidFridge, BiWorld, BiTrash } from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import { PiBathtubFill, PiCoatHangerFill, PiTelevisionFill } from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import { GiHeatHaze, GiCctvCamera, GiBarbecue, GiToaster, GiCampfire } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
const ListingDetail = () => {

    const facilities = [
        {
            name: "Bath tub",
            icon: <PiBathtubFill />,
        },
        {
            name: "Personal care products",
            icon: <FaPumpSoap />,
        },
        {
            name: "Outdoor shower",
            icon: <FaShower />,
        },
        {
            name: "Washer",
            icon: <BiSolidWasher />,
        },
        {
            name: "Dryer",
            icon: <BiSolidDryer />,
        },
        {
            name: "Hangers",
            icon: <PiCoatHangerFill />,
        },
        {
            name: "Iron",
            icon: <TbIroning3 />,
        },
        {
            name: "TV",
            icon: <PiTelevisionFill />,
        },
        {
            name: "Dedicated workspace",
            icon: <BsPersonWorkspace />
        },
        {
            name: "Air Conditioning",
            icon: <BsSnow />,
        },
        {
            name: "Heating",
            icon: <GiHeatHaze />,
        },
        {
            name: "Security cameras",
            icon: <GiCctvCamera />,
        },
        {
            name: "Fire extinguisher",
            icon: <FaFireExtinguisher />,
        },
        {
            name: "First Aid",
            icon: <BiSolidFirstAid />,
        },
        {
            name: "Wifi",
            icon: <BiWifi />,
        },
        {
            name: "Cooking set",
            icon: <FaKitchenSet />,
        },
        {
            name: "Refrigerator",
            icon: <BiSolidFridge />,
        },
        {
            name: "Microwave",
            icon: <MdMicrowave />,
        },
        {
            name: "Stove",
            icon: <GiToaster />,
        },
        {
            name: "Barbecue grill",
            icon: <GiBarbecue />,
        },
        {
            name: "Outdoor dining area",
            icon: <FaUmbrellaBeach />,
        },
        {
            name: "Private patio or Balcony",
            icon: <MdBalcony />,
        },
        {
            name: "Camp fire",
            icon: <GiCampfire />,
        },
        {
            name: "Garden",
            icon: <MdYard />,
        },
        {
            name: "Free parking",
            icon: <AiFillCar />,
        },
        {
            name: "Self check-in",
            icon: <FaKey />
        },
        {
            name: " Pet allowed",
            icon: <MdPets />
        }
    ];

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const handleShowErrorMessage = (message) => {
        toast.error(message)
    }

    const { listingId } = useParams();

    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleFetchDetailListing = async () => {
        try {
            const res = await fetch(`/api/listing/getdetailplace/${listingId}`, {
                method: "GET"
            });
            const data = await res.json();
            if (!res.ok) {
                console.log("Fetching listing failed...")
            }
            setListing(data);
            setLoading(false);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        handleFetchDetailListing();
    }, [listingId])

    // Booking calendar
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        }
    ]);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection])
    }

    const start = new Date(dateRange[0].startDate);
    const end = new Date(dateRange[0].endDate);
    const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24)

    // submit booking form
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const customerId = currentUser._id;

    const startDate = dateRange[0].startDate.toDateString();
    const endDate = dateRange[0].endDate.toDateString();
    const totalPrice = dayCount * listing.price;

    const bookingFormData = {
        customerId,
        hostId: listing.creator?._id,
        listingId: listing._id,
        startDate,
        endDate,
        totalPrice
    };

    const handleSubmitBookingForm = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/booking/createbooking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingFormData)
            });
            const data = await res.json();
            if (!res.ok) {
                handleShowErrorMessage(data.message);
            } else {
                navigate(`/trip/${bookingFormData.customerId}`)
            }
        } catch (error) {
            console.log(error.message);
            handleShowErrorMessage("Booking failed! Please try again");
        }
    }

    return (
        <Wrapper>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Navbar />
                    <form onSubmit={handleSubmitBookingForm} className='px-[50px] my-[20px] flex flex-col gap-[20px] bg-gray-50'>
                        <ToastContainer />
                        <div className="text-[30px] font-semibold flex items-center">
                            <h1 className='mr-[20px]'>{listing.title}</h1>
                            <StarIcon className='text-yellow-300' />
                            <StarIcon className='text-yellow-300' />
                            <StarIcon className='text-yellow-300' />
                            <StarIcon className='text-yellow-300' />
                            <StarHalfIcon className='text-yellow-300' />
                        </div>

                        <div className="flex flex-wrap gap-[20px] max-md:hidden">
                            {listing.listingPhotoPaths?.map((photo, index) => (
                                <div key={index} className='w-[200px] h-[200px]'>
                                    <img src={photo} alt="" className='w-full h-full object-cover rounded-[10px] shadow-lg' />
                                </div>
                            ))}
                        </div>

                        <div className='md:hidden'>
                            <Slider {...settings}>
                                {listing.listingPhotoPaths?.map((photo, index) => (
                                    <div key={index} className='w-[200px] h-[200px]'>
                                        <img src={photo} alt="" className='w-full h-full object-cover' />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        <h2 className='text-[20px] font-semibold'>{listing.type} in {listing.city}, {listing.province}, {listing.country}</h2>
                        <p>{listing.guestCount} guests - {listing.bedroomCount} bedroom - {listing.bedCount} bed - {listing.bathroomCount} bath</p>

                        <div className='flex items-center gap-[20px]'>
                            <div className='w-[50px] h-[50px]'>
                                <img src={listing.creator?.profilePic} alt="" className='w-full h-full object-cover rounded-full' />
                            </div>
                            <p>Contact with {listing.creator?.username}</p>
                            <div>
                                <AiOutlineMessage className='text-[20px] hover:text-red-400 cursor-pointer' />
                            </div>
                        </div>
                        <div className='border-[3px] border-gray-300 border-x-0 border-b-0 pt-[20px]'>
                            <h3 className='text-[18px] font-semibold mb-[10px]'>Description</h3>
                            <p className='text-[16px]'>{listing.description}</p>
                        </div>

                        <div className='border-[3px] border-gray-300 border-x-0 border-b-0 pt-[20px]'>
                            <h3 className='text-[18px] font-semibold mb-[10px]'>Highlight</h3>
                            <p className='text-[16px]'>{listing.highlightDesc}</p>
                        </div>

                        <div className='flex justify-between gap-[20px] max-md:flex-col border-[3px] border-gray-300 border-x-0 border-b-0 pt-[20px]'>
                            {/* AMENITIES */}
                            <div>
                                <h3 className='text-[18px] font-semibold mb-[10px]'>What this place offers ?</h3>
                                <div className='flex flex-wrap gap-[20px]'>
                                    {listing.amenities?.map((item, index) => (
                                        <div key={index} className='border flex flex-col justify-center items-center p-[10px] rounded-[10px] cursor-pointer'>
                                            <div>
                                                {facilities.find((facility) => facility.name === item)?.icon}
                                            </div>
                                            <p>{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* CALENDAR */}
                            <div>
                                <h3 className='text-[18px] font-semibold mb-[10px]'>How long do you want to stay</h3>
                                <div className=''>
                                    <DateRange ranges={dateRange} onChange={handleSelect} />

                                    <div className='pl-[20px] border border-gray-300 shadow-lg rounded-[10px] mt-[20px] py-[20px] bg-white '>
                                        <div className='flex gap-[10px] mb-[10px]'>
                                            <h2 className='font-semibold'>Cost : </h2>
                                            <h2 className='text-[18px] font-semibold'>${listing.price}/night</h2>
                                        </div>
                                        <div className='flex gap-[10px] mb-[10px]'>
                                            <h2 className='font-semibold'>From : </h2>
                                            <span>{dateRange[0].startDate.toLocaleDateString('en-GB')}</span>
                                        </div>
                                        <div className='flex gap-[10px] mb-[10px]'>
                                            <h2 className='font-semibold'>To : </h2>
                                            <span>{dateRange[0].endDate.toLocaleDateString('en-GB')}</span>
                                        </div>
                                        <div className='flex gap-[10px] mb-[10px]'>
                                            <h2 className='font-semibold'>Total price: </h2>
                                            <span >${dayCount * listing.price}</span>
                                        </div>

                                        <button type='submit' className='border bg-red-400 text-white rounded-[10px] py-[10px] px-[20px] mt-[10px] hover:bg-opacity-70 cursor-pointer'>
                                            Booking
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </Wrapper>
    )
}
const Wrapper = styled.section`

`
export default ListingDetail