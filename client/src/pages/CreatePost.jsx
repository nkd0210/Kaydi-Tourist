import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Loader from '../components/Loader';
// TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// SLIDE
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaRegFaceSadCry } from "react-icons/fa6";
// IMAGE UPLOAD
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { IoIosImages } from 'react-icons/io';
import { BiTrash } from 'react-icons/bi'


const CreatePost = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const { currentUser } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const handleShowErrorMessage = (message) => {
        toast.error(message)
    }

    // HANDLE UPLOAD IMAGE
    const fileRef = useRef(null);

    const [photos, setPhotos] = useState([]);
    const [formDataImage, setFormDataImage] = useState([]);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);

    const handleUploadPhotos = (e) => {
        const newPhoto = e.target.files;
        setPhotos((prevPhoto) => [...prevPhoto, ...newPhoto]);
    }

    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhoto) => prevPhoto.filter((_, index) => index !== indexToRemove));
    }

    const handleClickUploadDone = () => {
        handleFileUploadImages(photos);
        setUploadSuccess(true);
    }

    const handleFileUploadImages = async (images) => {
        const storage = getStorage(app);
        const uploadPromises = images.map((image) => {
            const fileName = new Date().getTime() + image.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, image);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setImageFileUploadProgress((prevProgress) => ({
                            ...prevProgress,
                            [fileName]: progress.toFixed(0),
                        }));
                    },
                    (error) => {
                        setImageFileUploadError((prevError) => ({
                            ...prevError,
                            [fileName]: 'Could not upload image (File must be less than 2MB)',
                        }));
                        console.log(error);
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                resolve({ fileName, downloadURL });
                            })
                            .catch((error) => reject(error));
                    }
                );
            });
        });

        try {
            const uploadedFiles = await Promise.all(uploadPromises);
            const newPhotos = uploadedFiles.map((file) => file.downloadURL);
            setFormDataImage((prevData) => ({
                ...prevData,
                listingPhotoPaths: [...(prevData.listingPhotoPaths || []), ...newPhotos],
            }));
            console.log("Upload successful");
        } catch (error) {
            console.error("Error uploading images: ", error);
        }
    };

    const handleClearAllPhotos = () => {
        setPhotos([]);
    }

    // HANDLE FORM 

    const [title, setTitle] = useState('');
    const [describe, setDescribe] = useState('');

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const formData = {
            creator: currentUser._id,
            title,
            image: formDataImage.listingPhotoPaths,
            content: describe
        }
        try {
            const res = await fetch(`/api/post/create/${currentUser._id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                handleShowErrorMessage("Create Post Error, something went wrong!")
                console.log(data.message);
            } else {
                navigate(`/post/getuserpost/${currentUser._id}`);
            }
        } catch (error) {
            handleShowErrorMessage("Creat Post Error, something went wrong!")
            console.log(error.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='mx-[100px] max-md:mx-[10px] my-[50px] max-md:my-[20px]'>
                <h2 className='text-center text-[30px] font-semibold mb-[50px]'>Create Your Post</h2>
                <form onSubmit={handleSubmitForm} className='bg-white p-[20px] flex flex-col gap-[40px]'>
                    {/* TITLE */}
                    <div className='flex max-md:flex-col gap-[20px]'>
                        <h3 className='font-semibold border rounded-[20px] h-[50px] w-[200px] text-center flex items-center justify-center shadow-lg text-[18px] max-md:text-[16px]'>What is your title ?</h3>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter your title here" required className='border rounded-[20px] p-[10px] w-[300px] h-[50px] shadow-md' />
                    </div>

                    {/* IMAGES */}
                    <div>
                        <span className='my-[20px] text-[18px] max-md:text-[16px] font-semibold border h-[50px] w-[300px] text-center flex items-center justify-center shadow-lg rounded-[20px]'>Add some photos of your place</span>

                        <div className='gap-[20px] py-[20px]' ref={fileRef}>

                            {photos.length < 1 && (
                                <>
                                    <input
                                        id="image"
                                        type='file'
                                        className='hidden'
                                        accept="image/*"
                                        onChange={handleUploadPhotos}
                                        multiple
                                    />
                                    <label htmlFor="image" className='w-[250px] flex flex-col justify-center items-center border border-black border-dotted p-[20px] cursor-pointer'>
                                        <div>
                                            <IoIosImages className='text-[20px]' />
                                        </div>
                                        <p className=''>Upload from your device</p>
                                    </label>
                                </>
                            )}

                            {photos.length >= 1 && (
                                <div className='flex flex-col'>
                                    {/* PHOTOS */}
                                    <div className='flex border overflow-x-scroll gap-[20px] rounded-[10px]'>
                                        {photos.map((photo, index) => (
                                            <div key={index} className='relative w-[150px] h-[150px]'>
                                                <div className='w-[150px] h-[150px]'>
                                                    <img src={URL.createObjectURL(photo)} alt="picture" className='w-full h-full obejct-cover rounded-[10px]' />
                                                </div>
                                                <div onClick={() => handleRemovePhoto(index)} className='absolute top-[5px] right-[5px] text-black cursor-pointer hover:text-red-400'><BiTrash /></div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* UPLOAD PHOTOS */}

                                    {uploadSuccess ? (
                                        <></>
                                    ) : (
                                        <div>
                                            <input
                                                id="image"
                                                type="file"
                                                className='hidden'
                                                onChange={handleUploadPhotos}
                                                multiple
                                            />
                                            <div className='flex items-center gap-[20px] mt-[20px]'>
                                                <label htmlFor="image" className='w-[100px] h-[50px] flex flex-col justify-center items-center border border-black border-dotted  cursor-pointer'>
                                                    <div className='text-[30px]'>
                                                        <IoIosImages onClick={() => fileRef.current.click()} className='' />
                                                    </div>
                                                </label>

                                                <div onClick={handleClickUploadDone} className=' flex items-center justify-center w-[100px] h-[50px] border rounded-[10px] bg-red-400 hover:bg-opacity-70 text-center cursor-pointer'>Save</div>
                                                <div onClick={handleClearAllPhotos} className='flex items-center justify-center w-[100px] h-[50px] border rounded-[10px] bg-red-400 hover:bg-opacity-70 text-center cursor-pointer'>Clear all</div>
                                            </div>
                                        </div>
                                    )}


                                </div>
                            )}

                        </div>

                    </div>

                    {/* DESCRIBE */}
                    <div className='flex flex-col gap-[20px]'>
                        <h3 className='font-semibold text-[18px] border rounded-[20px] shadow-lg w-[250px] p-[10px]'>What is your opinion ?</h3>
                        <textarea onChange={(e) => setDescribe(e.target.value)} placeholder='Write something here...' className='border h-[200px] p-[10px]'>

                        </textarea>

                    </div>

                    <button
                        type='submit'
                        className='rounded-[10px] w-[200px] h-[50px] bg-red-400 hover:opacity-70 cursor-pointer'
                    >
                        CREATE YOUR POST
                    </button>
                </form>

            </div>
        </div>
    )
}

export default CreatePost