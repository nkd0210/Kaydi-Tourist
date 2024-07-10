import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';

import ListingCard from '../components/ListingCard';
import Navbar from '../components/Navbar'
import { setPropertyList } from '../redux/user/userSlice';
import Loader from '../components/Loader';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { FaRegFaceSadCry } from "react-icons/fa6";
// CHART
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Statistic = () => {

    const { tripId } = useParams();
    const { currentUser } = useSelector((state) => state.user);

    const [bookedTrips, setBookedTrips] = useState([]);
    const [availableTrip, setAvailableTrip] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const [totalRevenue, setTotalRevenue] = useState(0);

    const fetchSingleBookedTrip = async () => {
        try {
            const res = await fetch(`/api/booking/getEachBooking/${currentUser._id}/${tripId}`, {
                method: "GET"
            });
            const data = await res.json();
            if (res.ok) {
                setBookedTrips(data);
                setAvailableTrip(true);
            }
        } catch (error) {
            console.log("Fetching single booked trip failed !", error.message)
        } finally {
            setLoading(false); // Set loading to false after fetch is complete
        }
    }

    useEffect(() => {
        fetchSingleBookedTrip();
    }, [currentUser]);

    useEffect(() => {
        if(bookedTrips && bookedTrips.eachTripBooking) {
            countTotalRevenue();
        }
    }, [bookedTrips])


    const countTotalRevenue = () => {
        let totalPrice = 0;
        bookedTrips.eachTripBooking.forEach((trip) => {
            totalPrice += trip.totalPrice;
        })
        setTotalRevenue(totalPrice);
    }

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
            <div className='mx-[100px] max-md:mx-[10px] my-[50px] max-md:my-[20px]'>
                <h2 className='text-center text-[30px] font-semibold mb-[50px]'>Statistic</h2>
                <div>
                    {loading ? (
                        <Loader />
                    ) : !availableTrip ? (
                        <div className='text-center border w-[400px] mx-auto flex flex-col justify-center items-center rounded-[20px] p-[20px] shadow-lg'>
                            <FaRegFaceSadCry className='my-[20px] text-[40px] text-blue-500' />
                            <p className='text-[20px] mb-[10px] text-red-400'>No one has booked this trip</p>
                        </div>
                    ) : (

                        <div className='flex flex-col gap-[20px]'>

                            <div className='flex w-[400px] gap-[20px] border rounded-[10px] p-[10px] shadow-lg'>
                                <h3 className='font-semibold '>Location: </h3>
                                <span >{bookedTrips.eachTripBooking[0]?.listingId?.title}</span>
                            </div>
                            <div className='flex max-md:flex-col gap-[20px]'>
                                <div className='flex gap-[10px] border rounded-[10px] p-[10px] shadow-lg'>
                                    <h3 className='font-semibold'>Today booked: </h3>
                                    <span >{bookedTrips.todayBook}</span>
                                </div>
                                <div className='flex gap-[10px] border rounded-[10px] p-[10px] shadow-lg'>
                                    <h3 className='font-semibold'>Yesterday booked: </h3>
                                    <span >{bookedTrips.yesterdayBooked}</span>
                                </div>
                                <div className='flex gap-[10px] border rounded-[10px] p-[10px] shadow-lg'>
                                    <h3 className='font-semibold'>Last week booked: </h3>
                                    <span >{bookedTrips.lastWeekBooked}</span>
                                </div>

                                <div className='flex gap-[10px] border rounded-[10px] p-[10px] shadow-lg'>
                                    <h3 className='font-semibold'>Last month booked: </h3>
                                    <span >{bookedTrips.lastMonthBooked}</span>
                                </div>
                            </div>
                            <div className='flex w-[400px] gap-[20px] border rounded-[10px] p-[10px] shadow-lg mb-[20px]'>
                                <h3 className='font-semibold '>Total revenue: </h3>
                                <span> ${totalRevenue}</span>
                            </div>


                            <div className='chart flex flex-wrap gap-[50px]'>
                                {/* BAR CHART */}
                                <div className='w-[400px] h-[350px] rounded-[10px] border border-black mb-[20px] p-[20px]'>
                                    <Bar
                                        data={{
                                            labels: bookedTrips.eachTripBooking.map((data) => data.customerId.username),
                                            datasets: [
                                                {
                                                    label: "Total price per trip",
                                                    data: bookedTrips.eachTripBooking.map((data) => data.totalPrice),
                                                    borderRadius: 10,
                                                }
                                            ]
                                        }}
                                    />
                                </div>
                                {/* LINE CHART */}
                                <div className='w-[400px] h-[350px] rounded-[10px] border border-black mb-[20px] p-[20px]'>
                                    <Line
                                        data={{
                                            labels: bookedTrips.eachTripBooking.map((data) => formatDate(data.createdAt)),
                                            datasets: [
                                                {
                                                    label: "Total price per trip",
                                                    data: bookedTrips.eachTripBooking.map((data) => data.totalPrice),
                                                    borderRadius: 10,
                                                }
                                            ]
                                        }}
                                    />
                                </div>
                                {/* DOUGHNUT CHART */}
                                <div className='w-[400px] h-[350px] rounded-[10px] border border-black mb-[20px] p-[20px]'>
                                    <Doughnut
                                        data={{
                                            labels: bookedTrips.eachTripBooking.map((data) => data.customerId.username),
                                            datasets: [
                                                {
                                                    label: "Total price per trip",
                                                    data: bookedTrips.eachTripBooking.map((data) => data.totalPrice),
                                                    borderRadius: 10,
                                                }
                                            ]
                                        }}
                                    />
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Statistic;
