import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import moment from 'moment';

import { Favorite } from "@mui/icons-material";
import { BiCommentDetail } from "react-icons/bi";
import { CiLink } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { FaThumbsUp } from 'react-icons/fa';

// CAROUSEL
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PostDetail = () => {
    const { postId } = useParams();
    const [loading, setLoading] = useState(true);
    const [detailPost, setDetailPost] = useState([]);
    const [openComment, setOpenComment] = useState(false);

    const { currentUser } = useSelector((state) => state.user);

    const fetchDetailPost = async () => {
        try {
            const res = await fetch(`/api/post/getsinglepost/${postId}`, {
                method: "GET"
            });
            const data = await res.json();
            if (!res.ok) {
                console.log("Fetching post failed...")
                return;
            } else {
                setDetailPost(data);
                setLoading(false);
            }
        } catch (error) {
            console.log("Fetching detail post failed", error.message)
        }
    }

    useEffect(() => {
        fetchDetailPost();
    }, []);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    };

    return (
        <div>
            <Navbar />
            <div className='my-[50px] mx-[80px] max-md:mx-[10px]'>
                {loading ? (
                    <Loader />
                ) : (
                    <div className='border max-h-[1000px] overflow-y-scroll rounded-[10px] bg-[#dfebff] p-[50px] max-md:p-[10px] '>
                        {/* USER INFO */}
                        <div className='flex gap-[20px] justify-start items-center'>
                            <div className='w-[60px] h-[60px] '>
                                <img src={detailPost?.creator.profilePic} alt="" className='w-full h-full object-cover rounded-[50%]' />
                            </div>
                            <div className='flex flex-col gap-[5px]'>
                                <p className='font-semibold text-[18px]'>{detailPost?.creator.username}</p>
                                <p className='text-gray-500 text-[14px]'>{moment(detailPost.createdAt).fromNow()}</p>
                            </div>
                        </div>
                        {/* POST  */}
                        <div className='flex flex-col'>
                            {/* TITLE */}
                            <h3 className='text-center font-semibold text-[20px] py-[20px] uppercase'>{detailPost?.title}</h3>
                            <div className='pb-[40px]'>
                                {detailPost?.content}
                            </div>
                            {/* IMAGE */}
                            <div className='w-[800px] max-md:w-full h-[200px] mx-auto'>
                                <Slider {...settings}>
                                    {detailPost?.image.map((photo, index) => (
                                        <div key={index} className='w-[800px] h-[200px] px-[10px] max-md:px-0'>
                                            <img src={photo} alt="" className='w-full h-full object-cover rounded-[10px]' />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>

                        {/* LIKE + COMMENT */}
                        <div className='my-[20px]'>
                            <div className='flex gap-[20px] items-center'>
                                <div className='flex gap-[5px] cursor-pointer hover:opacity-70'>
                                    <Favorite className='text-[14px] text-red-400' />
                                    <span className='text-gray-500 text-[14px]'>Like</span>
                                </div>

                                <div className='flex items-center gap-[5px] cursor-pointer hover:opacity-70'>
                                    <BiCommentDetail className='text-[18px] text-gray-500' />
                                    <span onClick={() => setOpenComment(!openComment)} className='text-gray-500 text-[14px] '>Comment</span>
                                </div>
                            </div>

                            {openComment ? (
                                <div className='border bg-gray-100 w-[full] h-[100px] rounded-[10px] my-[20px] p-[20px] shadow-md'>
                                    <form >
                                        <div className='flex justify-between items-center bg-white rounded-[20px] pr-[10px]'>
                                            <div className='w-[50px] h-[50px] '>
                                                <img src={currentUser.profilePic} alt="" className='w-full h-full object-cover rounded-[50%]' />
                                            </div>
                                            <input type="text" placeholder='Share something...' className='w-full mx-[15px]' />
                                            <div>
                                                <IoIosSend className='text-[20px] text-gray-500 cursor-pointer' />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            ) : (
                                <></>
                            )}

                            {/* COMMENT */}
                            <div className='border bg-white w-[full] h-[500px] overflow-y-scroll rounded-[10px] my-[20px] p-[20px] shadow-md'>
                                <h3 className='font-semibold text-[20px] mb-[20px]'>Comments</h3>
                                <div className='flex flex-col gap-[20px] border-b-[2px] pb-[10px]'>
                                    <div className='flex gap-[20px]'>
                                        <div className='w-[30px] h-[30px]'>
                                            <img src="" alt="avatar" className='w-full h-full object-cover rounded-[50%]' />
                                        </div>
                                        <span>username</span>
                                    </div>
                                    <div className='w-full'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut blandit lectus, non fermentum est. Nulla facilisi. Nulla facilisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut blandit lectus, non fermentum est. Nulla facilisi. Nulla facilisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut blandit lectus, non fermentum est. Nulla facilisi. Nulla facilisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut blandit lectus, non fermentum est. Nulla facilisi. Nulla facilisi.
                                    </div>
                                    <div className='flex items-center gap-[20px]'>
                                        <div className='flex items-center gap-[10px] border p-[10px] rounded-[20px] bg-gray-100'>
                                            <FaThumbsUp className='' />
                                            <p className='text-[14px]'>3</p>
                                        </div>
                                        <p className='text-gray-400 text-[14px]'>6 hour ago</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default PostDetail