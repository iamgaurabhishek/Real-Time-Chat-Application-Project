import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess, setError, startLoading, stopLoading } from '../../redux/slice/authSlice';
import toast from 'react-hot-toast';
import { firebaseAuth, googleProvider } from '../../utils/firebase-config';

const GoogleSignUp = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);  // Access global Loading state.

    const handleGoogleSignUp = async () => {
        try {
          dispatch(startLoading());  // Start loading
            const result = await signInWithPopup(firebaseAuth, googleProvider);
            const user = result.user;
            dispatch(loginSuccess({ user, isNewUser: true }));
            toast.success('Google sign-in successful');
            console.log('Google sign-in successful', user);
        } catch (error) {
            console.log('Google sign-in failed:', error);
            dispatch(setError('Google sign-in failed. Please try again'));
            toast.error("Google sign-in failed. Please try again");
        }
        finally{
          dispatch(stopLoading());   // Stop loading
        }
    };
  return (
    <div>
      <button 
          onClick={handleGoogleSignUp} 
          className={`bg-red-500 text-white py-2 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label='Sign up with Google'
          disabled={loading}
          >
        { loading ? "Signing Up..." : "Sign Up With Google" }
      </button>
    </div>
  )
}
export default GoogleSignUp;