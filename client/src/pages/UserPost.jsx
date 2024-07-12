import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import Navbar from '../components/Navbar'
import Loader from '../components/Loader';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { FaRegFaceSadCry } from "react-icons/fa6";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPost = () => {
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

    const [loading, setLoading] = useState(true);
    const [userPosts, setUserPosts] = useState([]);
    const [availablePost, setAvailablePost] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowErrorMessage = (message) => {
        toast.error(message)
    }

    const handleShowSuccessMessage = (message) => {
        toast.success(message);
    }

    const fetchUserPost = async () => {
        setLoading(true);
        setAvailablePost(false);
        try {
            const res = await fetch(`/api/post/getuserpost/${currentUser._id}`, {
                method: "GET"
            });
            const data = await res.json();
            if (!res.ok) {
                console.log("Fetching user post failed");
                setLoading(false);
            } else {
                setUserPosts(data);
                setLoading(false);
                setAvailablePost(true);
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserPost();
    }, [currentUser]);

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`/api/post/deletepost/${currentUser._id}/${postIdToDelete}`, {
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
                handleShowSuccessMessage("Delete post successfully");
                fetchUserPost();
                setShowModal(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div>
            <Navbar />
            <div className='mx-[100px] max-md:mx-[10px] my-[50px] max-md:my-[20px]'>
                <h2 className='text-center text-[30px] font-semibold mb-[50px]'>Your Upload Post</h2>
                {loading ? (
                    <Loader />
                ) : !availablePost ? (
                    <div>
                        <div className='text-center border w-[400px] mx-auto flex flex-col justify-center items-center rounded-[20px] p-[20px] shadow-lg'>
                            <FaRegFaceSadCry className='my-[20px] text-[40px] text-blue-500' />
                            <p className='text-[20px] mb-[10px] text-red-400'>You have not post anything</p>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-[50px] items-center'>
                        <ToastContainer />
                        <div className='flex max-md:flex-col gap-[20px]'>
                            <div className='flex gap-[10px] border rounded-[10px] p-[10px] shadow-lg'>
                                <h3 className='font-semibold'>Total post: </h3>
                                <span >{userPosts.totalPost}</span>
                            </div>
                            <div className='flex gap-[10px] border rounded-[10px] p-[10px] shadow-lg'>
                                <h3 className='font-semibold'>Last week post: </h3>
                                <span >{userPosts.lastWeekPost}</span>
                            </div>
                            <div className='flex gap-[10px] border rounded-[10px] p-[10px] shadow-lg'>
                                <h3 className='font-semibold'>Last month post: </h3>
                                <span >{userPosts.lastMonthPost}</span>
                            </div>

                        </div>

                        <div className='flex flex-wrap gap-[50px] justify-center items-center'>
                            {userPosts.userPost?.map((post, index) => (
                                <div onClick={() => navigate(`/post/detailpost/${post?._id}`)} key={index} className='w-[400px] h-[350px] overflow-x-hidden border rounded-[10px] shadow-lg'>
                                    {/* IMAGE */}
                                    <div className=' w-[400px] h-[200px]'>
                                        <Slider {...settings}>
                                            {post?.image.map((photo, index) => (
                                                <div key={index} className='w-[400px] h-[200px]'>
                                                    <img src={photo} alt="" className='w-full h-full object-cover' />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>

                                    {/* INFORMATION */}
                                    <div className='p-[10px]'>
                                        <div className='flex gap-[5px] mb-[2px]'>
                                            <span className='font-semibold'>Title:  </span>
                                            <h3>
                                                {post?.title}
                                            </h3>
                                        </div>

                                        <div className='flex gap-[5px] mb-[2px]'>
                                            <span className='font-semibold'>Author: </span>
                                            <p className='text-[16px] '>{post?.creator?.username}</p>
                                        </div>

                                    </div>

                                    <button type='button' disabled={!currentUser} onClick={(e) => { e.stopPropagation(); navigate(`/post/updatepost/${post._id}`) }} className='border w-[120px] rounded-[10px] p-[10px] my-[10px] ml-[10px] text-center bg-red-400 hover:opacity-70 hover:text-white'>
                                        Update Post
                                    </button>
                                    <button type='button' disabled={!currentUser} onClick={(e) => { e.stopPropagation(); setPostIdToDelete(post._id); setShowModal(true) }} className='border w-[120px] rounded-[10px] p-[10px] my-[10px] ml-[10px] text-center bg-blue-400 hover:opacity-70 hover:text-white'>
                                        Delete Post
                                    </button>

                                </div>
                            ))}
                        </div>

                    </div>
                )}

            </div>

            {showModal && (
                <div className='modal fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm'>
                    <Modal className='w-[400px] h-[300px] mx-auto mt-[200px]' show={showModal} size="md" onClose={() => setShowModal(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center p-[10px]">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this post?
                                </h3>
                                <div className="flex justify-center gap-[20px] mb-[20px]">
                                    <Button className='bg-red-400 p-[10px] rounded-[10px]' onClick={handleDeletePost}>
                                        Yes, I'm sure
                                    </Button>
                                    <Button className='bg-gray-400 p-[10px] rounded-[10px]' onClick={() => setShowModal(false)}>
                                        No, cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )}
        </div>
    )
}

export default UserPost