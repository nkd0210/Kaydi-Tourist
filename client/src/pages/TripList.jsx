import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { setTripList } from '../redux/user/userSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";

import { loadStripe } from '@stripe/stripe-js';

const TripList = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const { currentUser } = useSelector((state) => state.user);
    const tripList = currentUser.tripList;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFetchBookedTripList = async () => {
        try {
            const res = await fetch(`/api/user/trip/${currentUser._id}`, {
                method: "GET"
            });
            const data = await res.json();
            if (!res.ok) {
                console.log("Fetching trip list failed...")
            } else {
                dispatch(setTripList(data));
            }
        } catch (error) {
            console.log("Fetching trip list failed")
        }
    }

    useEffect(() => {
        handleFetchBookedTripList();
    }, [])

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    const handleShowErrorMessage = (message) => {
        toast.error(message)
    }

    const handleShowSuccessMessage = (message) => {
        toast.success(message);
    }

    // CANCEL TRIP
    const [showModal, setShowModal] = useState(false);
    const [bookingIdToDelete, setBookingIdToDelete] = useState('');
    const [cancelTrip, setCancelTrip] = useState(false); // check if cancel of payment

    const handleCancelTrip = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`/api/booking/cancelbooking/${currentUser._id}/${bookingIdToDelete}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();
            if (!res.ok) {
                handleShowErrorMessage(data.message);
                return;
            } else {
                handleShowSuccessMessage("Trip canceled successfully");
                handleFetchBookedTripList();
                setShowModal(false);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    // PAYMENT WITH STRIPE
    const [bookingIdToPayment, setBookingIdToPayment] = useState('');
    const [findBookedTrip, setFindBookedTrip] = useState([]);
    const [paymentTrip, setPaymentTrip] = useState(false);

    const findBookingToPayment = async () => {
        const res = await fetch(`/api/booking/findbooking/${bookingIdToPayment}`, {
            method: "GET"
        });
        const data = await res.json();
        if (!res.ok) {
            console.log(data.message);
            return;
        }
        else {
            setFindBookedTrip(data);
        }
    }

    useEffect(() => {
        if (bookingIdToPayment) {
            findBookingToPayment();
        }
    }, [bookingIdToPayment])

    console.log(findBookedTrip);

    const handlePayment = async () => {
        const stripe = await loadStripe("pk_test_51OucB4ELWvlzH2IqBRjByawqzrhsRKGxcCDhfxTCVIv7wYIkTKAWeJhgs2F1199zZG1Sg0Yz5Up34dyobBlfeVdd003S8HlkKQ");
        try {
            const res = await fetch(`/api/booking/payment`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: findBookedTrip?.listingId?.title,
                    image: findBookedTrip?.listingId?.listingPhotoPaths[0],
                    totalPrice: findBookedTrip?.totalPrice
                })
            });
            const session = await res.json();
            const result = stripe.redirectToCheckout({
                sessionId: session.id
            });
            if (result.error) {
                console.log(result.error);
            }else {
                
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Navbar />
            <div className='mx-[100px] max-md:mx-0 my-[50px] max-md:my-[20px]'>
                <ToastContainer />
                <h2 className='text-center text-[30px] font-semibold mb-[50px]'>All Your Booked Trip</h2>
                <div className='flex flex-wrap gap-[50px]'>
                    {tripList?.map((trip, index) => (

                        <div key={index} onClick={() => navigate(`/detailplace/${trip.listingId._id}`)} className='w-[400px]'>
                            <div className='relative mb-[100px] border rounded-[10px] shadow-lg bg-gray-50'>

                                {/* IMAGE */}
                                <div className=' w-[400px] h-[200px]'>
                                    <Slider {...settings}>
                                        {trip.listingId?.listingPhotoPaths.map((photo, index) => (
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
                                            {trip.listingId?.city}, {trip.listingId?.province}, {trip.listingId?.country}
                                        </p>
                                    </div>
                                    <div className='flex gap-[10px]'>
                                        <span className='font-semibold'>Type:</span>
                                        <p className='text-[16px] '>{trip.listingId?.category}</p>
                                    </div>
                                    <div className='flex gap-[10px]'>
                                        <span className='font-semibold'>Owner:</span>
                                        <p className='text-[16px] '>{trip.hostId?.username}</p>
                                    </div>
                                    <div className='flex gap-[10px]'>
                                        <span className='font-semibold'>Date: </span>
                                        <p>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                                    </div>
                                    <div className='flex gap-[10px]'>
                                        <span className='font-semibold'>Total price: </span>
                                        <p>${trip.totalPrice}</p>
                                    </div>
                                </div>

                                <button type='button' disabled={!currentUser} onClick={(e) => { e.stopPropagation(); setBookingIdToDelete(trip._id); setCancelTrip(true); setShowModal(true) }} className='border w-[120px] rounded-[10px] p-[10px] my-[10px] ml-[10px] text-center bg-red-400 hover:opacity-70 hover:text-white'>
                                    Cancel trip
                                </button>
                                <button type='button' disabled={!currentUser} onClick={(e) => { e.stopPropagation(); setBookingIdToPayment(trip._id); setPaymentTrip(true); setShowModal(true) }} className='border w-[120px] rounded-[10px] p-[10px] my-[10px] ml-[10px] text-center bg-blue-400 hover:opacity-70 hover:text-white'>
                                    Payment
                                </button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            {showModal && cancelTrip ? (
                <div className='modal fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm'>
                    <Modal className='w-[400px] h-[300px] mx-auto mt-[200px]' show={showModal} size="md" onClose={() => setShowModal(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center p-[10px]">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to cancel this trip?
                                </h3>
                                <div className="flex justify-center gap-[20px] mb-[20px]">
                                    <Button className='bg-red-400 p-[10px] rounded-[10px]' onClick={handleCancelTrip}>
                                        Yes, I'm sure
                                    </Button>
                                    <Button className='bg-gray-400 p-[10px] rounded-[10px]' onClick={() => { setShowModal(false); setCancelTrip(false) }}>
                                        No, cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            ) : showModal && paymentTrip && (
                <div className='modal fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm'>
                    <Modal className='w-[400px] h-[400px] rounded-[10px]  mx-auto mt-[200px]' show={showModal} size="md" onClose={() => setShowModal(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center p-[10px]">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Please check again your payment information:
                                </h3>
                                <div>
                                    <div className='flex gap-[20px]'>
                                        <span className='w-[80px]'>Location: </span>
                                        <div>{findBookedTrip?.listingId?.title}</div>
                                    </div>
                                    <div className='flex gap-[20px]'>
                                        <span className='w-[80px]'>Owner: </span>
                                        <div>{findBookedTrip?.hostId?.username}</div>
                                    </div>
                                    <div className='flex gap-[20px]'>
                                        <span className='w-[80px]'>Start date: </span>
                                        <div>{formatDate(findBookedTrip?.startDate)}</div>
                                    </div>
                                    <div className='flex gap-[20px]'>
                                        <span className='w-[80px]'>End date: </span>
                                        <div>{formatDate(findBookedTrip?.endDate)}</div>
                                    </div>
                                    <div className='flex gap-[20px] pb-[20px]'>
                                        <span className='w-[80px]'>Total price: </span>
                                        <div>{findBookedTrip?.totalPrice}</div>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-[20px] mb-[20px]">
                                    <Button className='bg-red-400 p-[10px] rounded-[10px]' onClick={handlePayment}>
                                        Yes, I'm sure
                                    </Button>
                                    <Button className='bg-gray-400 p-[10px] rounded-[10px]' onClick={() => { setShowModal(false); setPaymentTrip(false) }}>
                                        No, cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )}
        </>
    )
}

export default TripList