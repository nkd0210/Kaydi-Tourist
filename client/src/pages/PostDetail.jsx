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
import { BsThreeDots } from "react-icons/bs";
// CAROUSEL
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const PostDetail = () => {
    const { postId } = useParams();
    const [loading, setLoading] = useState(true);
    const [detailPost, setDetailPost] = useState([]);
    const [openComment, setOpenComment] = useState(false);

    const { currentUser } = useSelector((state) => state.user);

    const handleShowErrorMessage = (message) => {
        toast.error(message)
    }

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
        dots: true,
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

    // CREATE COMMENT
    const [comment, setComment] = useState(''); // create comment
    const [comments, setComments] = useState(''); // comment from the database

    const fetchComment = async () => {
        try {
            const res = await fetch(`/api/comment/getpostcomment/${postId}`, {
                method: "GET"
            });
            const data = await res.json();
            if (!res.ok) {
                console.log("Failed to fetch comments");
                return;
            } else {
                setComments(data);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchComment();
    }, [postId])

    const handleCreateComment = async () => {
        try {
            const res = await fetch(`/api/comment/create/${currentUser._id}/${postId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    creator: currentUser._id,
                    content: comment
                })
            });
            const data = await res.json();
            if (!res.ok) {
                console.log("Failed to create comment");
                return;
            } else {
                setComment('');
                setComments([data, ...comments]);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const [openDot, setOpenDot] = useState('');
    const toggleDotMenu = (commentId) => {
        setOpenDot(openDot === commentId ? null : commentId);
    };

    // EDIT COMMENT
    const [commentIdToEdit, setCommentIdToEdit] = useState(''); // to keep the id of the comment want to edit
    const [editComment, setEditComment] = useState(false); // to check if the user click on the edit or not so can show the input for user to edit comment
    const [editCommentValue, setEditCommentValue] = useState(''); // keep the value of the edit comment;
    const [editCommentDone, setEditCommentDone] = useState(false); // to show the updated at insted of created at

    const handleClickEdit = (commentId) => {
        setCommentIdToEdit(commentId);
        setEditComment(true);
        toggleDotMenu(commentId);
    }
    const handleClickCancel = () => {
        setEditComment(false);
        setEditCommentValue('');
    }

    const handleEditComment = async (req, res, next) => {
        try {
            const res = await fetch(`/api/comment/update/${currentUser._id}/${commentIdToEdit}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: editCommentValue
                })
            });
            const data = await res.json();
            if (!res.ok) {
                handleShowErrorMessage("Error updating comment, Please try again");
                return;
            }
            else {
                setEditComment(false);
                setEditCommentDone(true);
                fetchComment();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // DELETE COMMENT
    const [commentIdToDelete, setCommentIdToDelete] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleDeleteComment = async () => {
        try {
            const res = await fetch(`/api/comment/delete/${currentUser._id}/${commentIdToDelete}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (!res.ok) {
                handleShowErrorMessage("Error deleting comment, Something went wrong");
                return;
            } else {
                setCommentIdToDelete('');
                setShowModal(false);
                fetchComment();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // LIKE COMMENT
    const handleLike = async (commentId) => {
        if (!currentUser) {
            handleShowErrorMessage('Please login to like this comment');
            return;
        }
        try {
            const res = await fetch(`/api/comment/like/${commentId}`, {
                method: "PUT",
            });
            const data = await res.json();
            if (res.ok) {
                const updatedComment = comments.map((comment) => comment._id === commentId ? {
                    ...comment,
                    likes: data.likes,
                    numberOfLikes: data.likes.length,
                } : comment);
                setComments(updatedComment);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // LIKE POST
    const handleLikePost = async () => {
        if (!currentUser) {
            handleShowErrorMessage('Please login to like this post');
            return;
        }
        try {
            const res = await fetch(`/api/post/like/${postId}`, {
                method: "PUT",
            });
            const data = await res.json();
            if (res.ok) {
                const updatedPost = {
                    ...detailPost,
                    likes: data.likes,
                    numberOfLikes: data.likes.length
                };
                setDetailPost(updatedPost);
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div>
            <Navbar />
            <div className='my-[50px] mx-[80px] max-md:mx-[10px]'>
                {loading ? (
                    <Loader />
                ) : (
                    <div className='border max-h-[1000px] overflow-y-scroll rounded-[10px] bg-[#dfebff] p-[50px] max-md:p-[10px] '>
                        <ToastContainer />

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
                                    <Favorite onClick={() => handleLikePost()} className={`text-[14px] ${currentUser && detailPost.likes.includes(currentUser._id) ? 'text-red-400' : 'text-gray-500'}`} />
                                    <span className='text-gray-500 text-[14px]'>
                                        {detailPost.likes.length === 0 ? 'Like' : detailPost.likes.length === 1 ? `${detailPost.likes.length} like` : `${detailPost.likes.length} likes`}
                                    </span>
                                </div>

                                <div className='flex items-center gap-[5px] cursor-pointer hover:opacity-70'>
                                    <BiCommentDetail className='text-[18px] text-gray-500' />
                                    <span onClick={() => setOpenComment(!openComment)} className='text-gray-500 text-[14px] '>Comment</span>
                                </div>
                            </div>

                            {currentUser && openComment ? (
                                <div className='border bg-gray-100 w-[full] h-[100px] rounded-[10px] my-[20px] p-[20px] shadow-md'>
                                    <form >
                                        <div className='flex justify-between items-center bg-white rounded-[20px] pr-[10px]'>
                                            <div className='w-[50px] h-[50px] '>
                                                <img src={currentUser?.profilePic} alt="" className='w-full h-full object-cover rounded-[50%]' />
                                            </div>
                                            <input onChange={(e) => setComment(e.target.value)} value={comment} type="text" placeholder='Share something...' className='w-full mx-[15px]' />
                                            <div>
                                                <IoIosSend onClick={handleCreateComment} className='text-[20px] text-gray-500 cursor-pointer' />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            ) : !currentUser && openComment ? (
                                <div className='text-center'>
                                    <Link to='/signin' className='text-center text-gray-500 text-[16px] p-[10px] hover:font-semibold cursor-pointer'>Please login to comment</Link>
                                </div>
                            ) : (
                                <></>
                            )}

                            {/* COMMENT */}
                            <div className='border bg-white w-[full] max-h-[1000px] overflow-y-scroll rounded-[10px] my-[20px] p-[20px] shadow-md'>
                                <h3 className='font-semibold text-[20px]'>Comments</h3>

                                {comments && comments?.map((eachComment, index) => (
                                    <div key={index} className='flex flex-col gap-[10px] border-b-[2px] py-[20px] relative'>

                                        <div className='flex justify-between items-center '>
                                            <div className='flex items-center gap-[10px] '>
                                                <div className='w-[40px] h-[40px]'>
                                                    <img src={eachComment?.creator?.profilePic} alt="avatar" className='w-full h-full object-cover rounded-[50%]' />
                                                </div>
                                                <span className=''>{eachComment?.creator?.username}</span>
                                            </div>
                                            <div>
                                                <BsThreeDots onClick={() => toggleDotMenu(eachComment._id)} className='cursor-pointer' />
                                            </div>
                                        </div>

                                        {openDot === eachComment._id && (
                                            <div className='absolute right-0 top-[50px] flex flex-col items-center'>
                                                <div onClick={() => handleClickEdit(eachComment._id)} className='border w-[100px] text-center border-b-0 rounded-t-[10px] hover:bg-gray-50 cursor-pointer'>Edit</div>
                                                <div onClick={() => { setCommentIdToDelete(eachComment._id); setShowModal(true) }} className='border w-[100px] text-center hover:bg-gray-50 rounded-b-[10px] cursor-pointer'>Delete</div>
                                            </div>
                                        )}

                                        {editComment && commentIdToEdit === eachComment._id ? (
                                            <div className='pl-[10px] flex gap-[10px] items-center'>
                                                <input onChange={(e) => setEditCommentValue(e.target.value)} type="text" defaultValue={eachComment?.content} className='w-[300px] border p-[10px]' />
                                                <div onClick={handleEditComment} className='px-[20px] py-[10px] w-[80px] text-center border rounded-[10px] bg-red-300 cursor-pointer hover:opacity-70'>Save</div>
                                                <div onClick={handleClickCancel} className='px-[20px] py-[10px] border rounded-[10px] w-[80px] text-center bg-blue-300 cursor-pointer hover:opacity-70'>Cancel</div>
                                            </div>
                                        ) : (
                                            <div className='w-full pl-[10px]'>
                                                {eachComment?.content}
                                            </div>
                                        )}

                                        <div className='flex items-center gap-[10px]'>
                                            <div className='flex items-center gap-[10px] border p-[5px] rounded-[20px] bg-gray-100'>
                                                <div onClick={() => handleLike(eachComment._id)} className={`${currentUser && eachComment.likes.includes(currentUser._id) && 'text-blue-500'} `}>
                                                    <FaThumbsUp className='' />
                                                </div>
                                                <p className='text-[14px]'>{eachComment.numberOfLikes}</p>
                                            </div>
                                            <p className='text-gray-400 text-[14px]'>
                                                {editCommentDone ? (moment(eachComment.updatedAt).fromNow()) : (moment(eachComment.createdAt).fromNow())}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {!comments && (
                                    <div className='my-[20px]'>
                                        No comments yet. Be the first to comment!
                                    </div>
                                )}

                            </div>

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
                                    Are you sure you want to delete this comment?
                                </h3>
                                <div className="flex justify-center gap-[20px] mb-[20px]">
                                    <Button className='bg-red-400 p-[10px] rounded-[10px]' onClick={handleDeleteComment}>
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

export default PostDetail