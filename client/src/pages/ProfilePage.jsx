import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LaptopImg from '/laptop.jpg'
import { HiOutlineHome } from "react-icons/hi";
import { updateFailure, updateStart, updateSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({}); // to update info user

    const fileRef = useRef(null);

    const [image, setImage] = useState(undefined);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);

    const handleShowErrorMessage = (message) => {
        toast.error(message)
    }

    const handleShowSuccessMessage = (message) => {
        toast.success(message)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateStart());

        try {
            const res = await fetch(`/api/user/updateuser/${currentUser._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message))
                handleShowErrorMessage("Update Failed, Try again")
            } else {
                dispatch(updateSuccess(data));
                handleShowSuccessMessage("Update Successfuly")
            }
        } catch (error) {
            console.log(error.message);
            handleShowErrorMessage(error.message);
        }
    }

    const handleDeleteAccount = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/deleteuser/${currentUser._id}`, {
                method: "DELETE",
            })
            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));
                handleShowErrorMessage("Delete user failed");
            } else {
                dispatch(deleteUserSuccess(data));
                navigate('/signin')
            }

        } catch (error) {
            dispatch(deleteUserFailure(error.message));
            handleShowErrorMessage("Delete Failed, Something went wrong");
        }
    }

    const handleFileUploadImage = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName); //tạo một tham chiếu (reference) đến một tệp tin hoặc thư mục cụ thể trong Firebase Storage dựa trên đối tượng storage và chuỗi fileName.
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Could not upload image (File must be less than 2MB)');
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setFormData({ ...formData, profilePic: downloadURL })
                    })
            }
        )
    }

    useEffect(() => {
        if (image) {
            handleFileUploadImage(image)
        }
    }, [image])

    return (
        <div className='flex h-screen justify-center items-center my-[20px]'>
            <ToastContainer />
            <div className="w-1/3 max-md:w-full border border-black rounded-[10px]  ">

                <div className='relative'>
                    {/* BACKGROUND IMAGE */}
                    <div className="w-full h-[200px]">
                        <img src={LaptopImg} alt="laptop" className='w-full h-full object-cover rounded-t-[10px]' />
                    </div>
                    {/* 
                        Firebase rule to upload image:
                        allow read;
                        allow write: if
                        request.resource.size < 2 * 1024 * 1024 &&
                        request.resource.
                        contentType.matches('image/.*')
                    */}

                    <button className='absolute top-0 p-[10px]'>
                        <Link to='/'>
                            <HiOutlineHome className='text-[24px] text-white' />
                        </Link>
                    </button>

                    {/* AVATAR */}
                    <div className="absolute bottom-[-40px] left-1/2 right-1/2 transform -translate-x-1/2  avatar w-[80px] h-[80px] ">
                        <input onChange={(e) => setImage(e.target.files[0])} className='hidden' accept='image/*' type="file" ref={fileRef} />
                        <img
                            onClick={() => fileRef.current.click()}
                            src={formData.profilePic || currentUser.profilePic}
                            alt=""
                            className='cursor-pointer avaImage w-[80px] h-[80px] object-cover rounded-[50%] p-[2px] '
                        />
                        <p>
                            {imageFileUploadError ? (
                                <span className='text-red-700'>Error uploading</span>
                            ) :
                                imageFileUploadProgress > 0 && imageFileUploadProgress < 100 ? (
                                    <span className='text-slate-700'>{`Uploading: ${imageFileUploadProgress} %`}</span>
                                ) : imageFileUploadProgress === 100 ? (
                                    <span className='text-green-700'>Image uploaded success</span>
                                ) : ''
                            }
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='info my-[80px] flex flex-col justify-center items-center'>
                    <input onChange={handleChange} defaultValue={currentUser.username} type='text' id='username' placeholder='username' className='bg-slate-100 rounded-[10px] p-[10px] w-[300px] mb-[20px] ' />
                    <input onChange={handleChange} defaultValue={currentUser.email} type='email' id='email' placeholder='email' className='bg-slate-100 rounded-[10px] p-[10px] w-[300px] mb-[20px]' />
                    <input onChange={handleChange} type='password' id='password' placeholder='password' className='bg-slate-100 rounded-[10px] p-[10px] w-[300px] mb-[20px]' />
                    <button type='submit' className='bg-slate-600  text-white p-3 rounded-[10px] w-[300px] mb-[10px]'>Update</button>
                    <div onClick={handleDeleteAccount} className='bg-red-400  text-white p-3 rounded-[10px] w-[300px] text-center hover:cursor-pointer'>Delete Account</div>
                </form>
            </div>
        </div>
    )
}

export default ProfilePage