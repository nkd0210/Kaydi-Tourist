import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import Navbar from '../components/Navbar'
import { setPropertyList } from '../redux/user/userSlice';
import Loader from '../components/Loader';
// TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// SLIDE
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaRegFaceSadCry } from "react-icons/fa6";


const SearchPage = () => {
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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchList, setSearchList] = useState([]);
    const { searchKeyWord } = useParams();
    const [searchFound, setSearchFound] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleShowErrorMessage = (message) => {
        toast.error(message)
    }

    const fetchSearchList = async () => {
        try {
            const res = await fetch(`/api/listing/search/${searchKeyWord}`, {
                method: "GET"
            });
            const data = await res.json();
            if (!res.ok) {
                handleShowErrorMessage("Searching error...");
                setSearchFound(false);
                setLoading(false);
                return;
            } else {
                setSearchList(data);
                setSearchFound(true);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setSearchFound(false);
            console.log("Searching failed", error.message);
        }
    }

    useEffect(() => {
        fetchSearchList();
    }, [searchKeyWord])

    return (
        <div>
            <Navbar />
            <div className='mx-[100px] max-md:mx-[10px] my-[50px] max-md:my-[20px]'>
                <h2 className='text-center text-[30px] font-semibold mb-[50px]'>Searching Page</h2>
                <div>
                    {loading ? (
                        <Loader />
                    ) : !searchFound ? (
                        <div className='text-center border w-[400px] mx-auto flex flex-col justify-center items-center rounded-[20px] p-[20px] shadow-lg'>
                            <FaRegFaceSadCry className='my-[20px] text-[40px] text-blue-500' />
                            <p className='text-[20px] mb-[10px] text-red-400'>Nothing match your search</p>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-[50px]'>
                            <div className='flex w-[400px] gap-[20px] border rounded-[10px] p-[10px] shadow-lg mx-auto'>
                                <h3 className='font-semibold '>Search: </h3>
                                <span >{searchKeyWord}</span>
                            </div>
                            <div className='flex flex-wrap gap-[50px]'>
                                {searchList?.map((trip, index) => (
                                    <div key={index} onClick={() => navigate(!currentUser ? '/signin' : `/detailplace/${trip._id}`)} className='w-[400px]'>
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    )}
                </div>

            </div>
        </div>
    )
}

export default SearchPage