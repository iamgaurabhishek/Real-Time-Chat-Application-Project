import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/slice/authSlice';
import toast from 'react-hot-toast';
import { firebaseAuth, googleProvider } from '../../utils/firebase-config';

const GoogleSignUp = () => {
    const dispatch = useDispatch();

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(firebaseAuth, googleProvider);
            const user = result.user;
            dispatch(loginSuccess({ user, isNewUser: true }));
            console.log('Google sign-in successful', user);
        } catch (error) {
            console.log('Google sign-in failed:', error);
            toast.error("Google sign-in failed. Please try again");
        }
    };
  return (
    <div>
      <button onClick={handleGoogleSignUp} className="bg-red-500 text-white py-2 px-4 rounded-lg">
        Sign Up With Google
      </button>
    </div>
  )
}

export default GoogleSignUp;