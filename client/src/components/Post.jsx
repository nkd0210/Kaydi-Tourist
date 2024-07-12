import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { setRecentPost, setRecentPostStart } from '../redux/user/userSlice';
// CAROUSEL
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Post = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { recentposts } = useSelector((state) => state.user);

    const fetchAllPosts = async () => {
        dispatch(setRecentPostStart());
        try {
            const res = await fetch(`/api/post/getrecentpost/3`, {
                method: "GET"
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(setRecentPost(data));
                setLoading(false);
            }
        } catch (error) {
            console.log("Fetching all post failed: ", error.message)
        }
    }

    useEffect(() => {
        fetchAllPosts();
    }, [])

    const [loading, setLoading] = useState(true);
    return (
        <div className='pb-[50px] px-[80px] max-md:px-[10px]'>
            <h1 className='text-[30px] text-center font-semibold text-slate-700 mb-[50px]'>Some Recents Posts</h1>
            {loading ? (
                <div className="mt-[50px]" >
                    <Loader />
                </div>
            ) : (
                <div className='flex flex-wrap gap-[50px] justify-center items-center'>
                    {recentposts?.map((post, index) => (
                        <div onClick={() => navigate(`/post/detailpost/${post._id}`)} key={index} className='w-[400px] h-[300px] overflow-x-hidden border rounded-[10px] shadow-lg'>
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
                                        {post.title}
                                    </h3>
                                </div>

                                <div className='flex gap-[5px] mb-[2px]'>
                                    <span className='font-semibold'>Author: </span>
                                    <p className='text-[16px] '>{post.creator.username}</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Post