import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux'
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from 'react-router-dom';

const OAuth = () => {

    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' }); // when click the continue with google , it will always ask to choose which account
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: resultsFromGoogle.user.email,
                    name: resultsFromGoogle.user.displayName,
                    photo: resultsFromGoogle.user.photoURL
                })
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div onClick={handleClickGoogle} className='w-3/4 max-md:w-full border-blue-300 border rounded-[20px] p-[5px] bg-blue-300 text-white hover:bg-opacity-70 hover:text-black cursor-pointer'>
            Join with google
        </div>
    )
}

export default OAuth