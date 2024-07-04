import React from 'react'
import Navbar from '../components/Navbar'
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// IMAGE UPLOAD
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { IoIosImages } from 'react-icons/io';
import { MdAttachMoney } from "react-icons/md";

const CreatePlace = () => {

    const categories = [
        {
            label: "All",
            icon: <BiWorld />,
        },
        {
            img: "assets/beach_cat.jpg",
            label: "Beachfront",
            icon: <TbBeach />,
            description: "This property is close to the beach!",
        },
        {
            img: "assets/windmill_cat.webp",
            label: "Windmills",
            icon: <GiWindmill />,
            description: "This property is has windmills!",
        },
        {
            img: "assets/modern_cat.webp",
            label: "Iconic cities",
            icon: <MdOutlineVilla />,
            description: "This property is modern!",
        },
        {
            img: "assets/countryside_cat.webp",
            label: "Countryside",
            icon: <TbMountain />,
            description: "This property is in the countryside!",
        },
        {
            img: "assets/pool_cat.jpg",
            label: "Amazing Pools",
            icon: <TbPool />,
            description: "This is property has a beautiful pool!",
        },
        {
            img: "assets/island_cat.webp",
            label: "Islands",
            icon: <GiIsland />,
            description: "This property is on an island!",
        },
        {
            img: "assets/lake_cat.webp",
            label: "Lakefront",
            icon: <GiBoatFishing />,
            description: "This property is near a lake!",
        },
        {
            img: "assets/skiing_cat.jpg",
            label: "Ski-in/out",
            icon: <FaSkiing />,
            description: "This property has skiing activies!",
        },
        {
            img: "assets/castle_cat.webp",
            label: "Castles",
            icon: <GiCastle />,
            description: "This property is an ancient castle!",
        },
        {
            img: "assets/cave_cat.jpg",
            label: "Caves",
            icon: <GiCaveEntrance />,
            description: "This property is in a spooky cave!",
        },
        {
            img: "assets/camping_cat.jpg",
            label: "Camping",
            icon: <GiForestCamp />,
            description: "This property offers camping activities!",
        },
        {
            img: "assets/arctic_cat.webp",
            label: "Arctic",
            icon: <BsSnow />,
            description: "This property is in arctic environment!",
        },
        {
            img: "assets/desert_cat.webp",
            label: "Desert",
            icon: <GiCactus />,
            description: "This property is in the desert!",
        },
        {
            img: "assets/barn_cat.jpg",
            label: "Barns",
            icon: <GiBarn />,
            description: "This property is in a barn!",
        },
        {
            img: "assets/lux_cat.jpg",
            label: "Luxury",
            icon: <IoDiamond />,
            description: "This property is brand new and luxurious!",
        },
    ];

    const types = [
        {
            name: "An entire place",
            description: "Guest have the whole place to themselves",
            icon: <FaHouseUser />,
        },
        {
            name: "Room(s)",
            description:
                "Guests have their own room in a house, plus access to shared places",
            icon: <BsFillDoorOpenFill />,
        },
        {
            name: "A Shared Room",
            description:
                "Guests sleep in a room or common area that maybe shared with you or others",
            icon: <FaPeopleRoof />,
        },
    ];

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

    // HANDLE FORM SUBMISSION STEP 1
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [formLocation, setFormLocation] = useState([]);

    const handleChangeFormLocation = (e) => {
        setFormLocation({ ...formLocation, [e.target.id]: e.target.value })
    }

    const [guestCount, setGuestCount] = useState(1);
    const [bedroomCount, setBedroomCount] = useState(1);
    const [bedCount, setBedCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);

    const handleDecreaseGuestCount = () => {
        if (guestCount > 1) {
            setGuestCount(guestCount - 1);
        }
    }

    const handleDecreaseBedRoomCount = () => {
        if (bedroomCount > 1) {
            setBedroomCount(bedroomCount - 1);
        }
    }

    const handleDecreaseBedCount = () => {
        if (bedCount > 1) {
            setBedCount(bedCount - 1);
        }
    }

    const handleDecreaseBathroomCount = () => {
        if (bathroomCount > 1) {
            setBathroomCount(bathroomCount - 1);
        }
    }

    // HANDLE FORM SUBMISSION STEP 2
    const [amenities, setAmenities] = useState([]);

    const handleSelectAmenities = (facility) => {
        if (amenities.includes(facility)) {
            setAmenities((prevAmenities) => prevAmenities.filter((option) => option !== facility))
        } else {
            setAmenities((prev) => [...prev, facility])
        }
    }

    const [describeForm, setDescribeForm] = useState([]);

    const handleChangeDescribeForm = (e) => {
        setDescribeForm({ ...describeForm, [e.target.id]: e.target.value })
    }

    // HANDLE SUBMIT FORM

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();


    const updateFormData = (newData) => {
        setFormData((prevData) => ({ ...prevData, ...newData }))
    }

    const handleShowErrorMessage = (message) => {
        toast.error(message)
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const listingForm = {
            creator: currentUser._id,
            category,
            type,
            streetAddress: formLocation.streetAddress,
            aptSuite: formLocation.aptSuite,
            city: formLocation.city,
            province: formLocation.province,
            country: formLocation.country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title: describeForm.title,
            description: describeForm.description,
            highlight: describeForm.highlight,
            highlightDesc: describeForm.highlightDesc,
            price: describeForm.price,
            listingPhotoPaths: formDataImage.listingPhotoPaths
        };

        try {

            const res = await fetch(`/api/listing/createlisting`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(listingForm)
            });
            const data = await res.json();
            if (!res.ok) {
                handleShowErrorMessage(data.message);
                return;
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // FETCH LISTING
    const fetchListing = async () => {
        try {
            const res = await fetch(`/api/listing/getlisting`);
            const data = await res.json();

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Wrapper>
            <Navbar />
            <ToastContainer />
            <div className='p-[20px] max-md:p-0 bg-gray-50'>
                <h1 className='text-slate-500 font-bold text-[24px] m-[20px]'>Public Your Place</h1>
                <form onSubmit={handleSubmitForm} className='bg-white p-[20px] flex flex-col gap-[40px]'>

                    {/* STEP 1 */}
                    <div>
                        <h2 className='text-red-400 text-[20px] font-semibold'>Step 1: Tell us about your place</h2>
                        <div>
                            <hr className='border-black my-[20px]' />
                            <span className='py-[10px] text-[18px] font-semibold'>Which of these categories best describes your place</span>
                            <div className='contain'>
                                {categories.map((item, index) => (
                                    <div
                                        onClick={() => setCategory(item.label)}
                                        key={index}
                                        className={`${category === item.label ? 'border-red-500 bg-red-100 shadow-lg ' : ''} border rounded-[10px] shadow-md flex flex-col justify-center items-center p-[10px] gap-[5px] cursor-pointer`}
                                    >
                                        <div>{item.icon}</div>
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='my-[20px]'>
                            <span className='text-[18px] font-semibold'>What type of place will guest have ?</span>
                            <div className='contain'>
                                {types.map((item, index) => (
                                    <div
                                        onClick={() => setType(item.name)}
                                        key={index}
                                        className={`${type === item.name ? 'border-red-500 bg-red-100 shadow-lg' : ''} border shadow-md rounded-[10px] p-[10px] cursor-pointer`}
                                    >
                                        <div>
                                            <h3 className='font-semibold'>{item.name}</h3>
                                            <p className='text-gray-600'>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='my-[20px]'>
                            <span className='text-[18px] font-semibold'>Where's your place located ?</span>
                            <div className='my-[20px]'>
                                <div className='mb-[10px]'>Street Address</div>
                                <input onChange={handleChangeFormLocation} id='streetAddress' className='w-[250px] outline-none border rounded-[10px] p-[10px]' type="text" placeholder='Street Address' />
                            </div>
                            <div className='flex max-md:flex-col gap-[50px] max-md:gap-[20px] my-[20px]'>
                                <div>
                                    <div className='mb-[10px]'>Apartment, Suite, etc. (if applicable)</div>
                                    <input onChange={handleChangeFormLocation} id='aptSuite' className='w-[250px] outline-none border rounded-[10px] p-[10px]' type="text" placeholder='Apt, Suite, etc' />
                                </div>
                                <div>
                                    <div className='mb-[10px]'>City</div>
                                    <input onChange={handleChangeFormLocation} id='city' className='w-[250px] outline-none border rounded-[10px] p-[10px]' type="text" placeholder='City' />
                                </div>
                            </div>
                            <div className='flex max-md:flex-col gap-[50px] max-md:gap-[20px] my-[20px]'>
                                <div>
                                    <div className='mb-[10px]'>Province</div>
                                    <input onChange={handleChangeFormLocation} id='province' className='w-[250px] outline-none border rounded-[10px] p-[10px]' type="text" placeholder='Province' />
                                </div>
                                <div>
                                    <div className='mb-[10px]'>Country</div>
                                    <input onChange={handleChangeFormLocation} id='country' className='w-[250px] outline-none border rounded-[10px] p-[10px]' type="text" placeholder='Country' />
                                </div>
                            </div>
                        </div>

                        <div className='my-[20px]'>
                            <span className='text-[18px] font-semibold'>Share some basics about your place</span>
                            <div className='flex max-md:flex-col gap-[20px] mt-[20px]'>
                                <div className='flex justify-between gap-[20px] border rounded-[10px] w-[200px] p-[10px]'>
                                    <p>Guest</p>
                                    <div className='flex justify-center items-center text-center'>
                                        <CiCircleMinus className='cursor-pointer text-[20px]' onClick={handleDecreaseGuestCount} />
                                        <p className='px-[10px] text-[18px]'>{guestCount}</p>
                                        <CiCirclePlus className='cursor-pointer text-[20px]' onClick={() => setGuestCount(guestCount + 1)} />
                                    </div>
                                </div>
                                <div className='flex justify-between gap-[20px] border rounded-[10px]  w-[200px] p-[10px]'>
                                    <p>Bedroom</p>
                                    <div className='flex justify-center items-center text-center'>
                                        <CiCircleMinus className='cursor-pointer text-[20px]' onClick={handleDecreaseBedRoomCount} />
                                        <p className='px-[10px] text-[18px]'>{bedroomCount}</p>
                                        <CiCirclePlus className='cursor-pointer text-[20px]' onClick={() => setBedroomCount(bedroomCount + 1)} />
                                    </div>
                                </div>
                                <div className='flex justify-between gap-[20px] border rounded-[10px]  w-[200px] p-[10px]'>
                                    <p>Bed</p>
                                    <div className='flex justify-center items-center text-center'>
                                        <CiCircleMinus onClick={handleDecreaseBedCount} className=' cursor-pointer text-[20px]' />
                                        <p className='px-[10px] text-[18px]'>{bedCount}</p>
                                        <CiCirclePlus onClick={() => setBedCount(bedCount + 1)} className='cursor-pointer text-[20px]' />
                                    </div>
                                </div>
                                <div className='flex justify-between gap-[20px] border rounded-[10px]  w-[200px] p-[10px]'>
                                    <p>Bathroom</p>
                                    <div className='flex justify-center items-center text-center'>
                                        <CiCircleMinus onClick={handleDecreaseBathroomCount} className='cursor-pointer text-[20px]' />
                                        <p className='px-[10px] text-[18px]'>{bathroomCount}</p>
                                        <CiCirclePlus onClick={() => setBathroomCount(bathroomCount + 1)} className='cursor-pointer text-[20px]' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STEP 2 */}
                    <div>
                        <h2 className='text-red-400 text-[20px] font-semibold'>Step 2: Make your place stand out</h2>

                        <div className='my-[20px]'>
                            <span className='my-[20px] text-[18px] font-semibold'>Tell guest what your place has to offer</span>
                            <div className='contain2 my-[20px]'>
                                {facilities.map((item, index) => (
                                    <div
                                        onClick={() => handleSelectAmenities(item.name)}
                                        key={index}
                                        className={`${amenities.includes(item.name) ? 'border-red-500 bg-red-100 shadow-lg' : ''} border rounded-[10px] p-[10px] flex flex-col justify-center items-center text-center cursor-pointer`}
                                    >
                                        <div>{item.icon}</div>
                                        <p>{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* IMAGES */}
                        <div>
                            <span className='my-[20px] text-[18px] font-semibold'>Add some photos of your place</span>

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
                                                <IoIosImages onClick={() => fileRef.current.click()} className='text-[20px]' />
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

                        <div>
                            <span className='my-[20px] text-[18px] font-semibold'>What make your place attractive and exciting ?</span>
                            <div className='my-[20px]'>
                                <div className='mb-[10px]'>Title</div>
                                <input onChange={handleChangeDescribeForm} id='title' className='w-[400px] outline-none border rounded-[10px] p-[10px]' type="text" placeholder='Title' />
                            </div>
                            <div className='my-[20px]'>
                                <div className='mb-[10px]'>Description</div>
                                <textarea onChange={handleChangeDescribeForm} id='description' className='w-[400px] outline-none border rounded-[10px] p-[10px]' type="text" placeholder='Description' />
                            </div>
                            <div className='my-[20px]'>
                                <div className='mb-[10px]'>Highlight</div>
                                <input onChange={handleChangeDescribeForm} id='highlight' className='w-[400px] outline-none border rounded-[10px] p-[10px]' type="text" placeholder='Highlight' />
                            </div>
                            <div className='my-[20px]'>
                                <div className='mb-[10px]'>Highlight details</div>
                                <textarea onChange={handleChangeDescribeForm} id='highlightDesc' className='w-[400px] outline-none border rounded-[10px] p-[10px]' type="text" placeholder='Highlight details' />
                            </div>
                            <div className='my-[20px]'>
                                <div className='mb-[10px] font-semibold'>Now, set your PRICE</div>
                                <div className='flex gap-[10px] items-center'>
                                    <div><MdAttachMoney className='text-[30px]' /></div>
                                    <input onChange={handleChangeDescribeForm} id='price' className='w-[200px] h-[50px] outline-none border rounded-[10px] p-[10px]' type="number" placeholder={100} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='rounded-[10px] w-[200px] h-[50px] bg-red-400 hover:opacity-70 cursor-pointer'
                    >
                        CREATE YOUR PLACE
                    </button>
                </form>
            </div>

        </Wrapper>
    )
}

const Wrapper = styled.section`
    .contain {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }
    .contain2 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }
    

    @media (max-width: 768px) {
        .contain2 {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }
    }

    
`

export default CreatePlace