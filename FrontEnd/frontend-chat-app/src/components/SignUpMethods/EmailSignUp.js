import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { firebaseAuth } from '../../utils/firebase-config';
import { loginSuccess, setError, startLoading, stopLoading } from '../../redux/slice/authSlice';

const EmailSignUp = ({ setShowLogin }) => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);   // Access global Loading state

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // --------------------------------PASSWORD VALIDATION --------------------------------
    const isPasswordValid = (password, name) => {
      const nameRegex = new RegExp(name, 'i');  // Case-insensitive check for name
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
      return !nameRegex.test(password) && specialCharRegex.test(password);
    };
    //-------------------------------------------------------------------------------------

    const handleEmailSignUp = async (e) => {

      e.preventDefault();

        if(formValues.password !== formValues.confirmPassword) {
            toast.error('Password do not match');
            return;
        }
        if(!isPasswordValid(formValues.password, formValues.name)) {
          toast.error('Password must contain at least one special character and cannot be your name');
          return;
        }
        if(formValues.password.length < 6){
          toast.error('Password must be at least 6 characters');
          return;
        }
        try{
          dispatch(startLoading());  // Start loading
            const userCredential = await createUserWithEmailAndPassword(
                firebaseAuth,
                formValues.email,
                formValues.password
            );
            const user = userCredential.user;
            dispatch(loginSuccess({ user, isNewUser: true }));
            toast.success("Email sign-up successful!");
            // console.log("Email sign-up successful: ", user);
        }
        catch(error) {
            const errorMessage = error.message || 'Email sign-up failed. Please try again.';
            dispatch(setError(errorMessage));
            toast.error("Email sign-up failed. Please try again");
            console.error("Error creating user: ", error);
        }
        finally{
          dispatch(stopLoading()); // Stop loading
        }
    };

  return (
    <div>
      <input
            className='w-full border border-gray- rounded-lg p-2 mb-4'
            type='text'
            placeholder='Name'
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            required
      />
      <input 
            className='w-full border border-gray-300 rounded-lg p-2 mb-4'
            type='email'
            placeholder='Email'
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            required
      />
      <input
            className='w-full border border-gray-300 rounded-lg p-2 mb-4'
            type='password'
            placeholder='Password'
            value={formValues.password}
            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
            required
      />
      <input 
            className='w-full border border-gray-300 rounded-lg p-2 mb-4'
            type='password'
            placeholder='Confirm Password'
            value={formValues.confirmPassword}
            onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })}
            required
      />
      <button onClick={handleEmailSignUp} className="bg-primary-color text-white py-2 px-4 rounded-lg">
        Sign Up With Email
      </button>
      <button type='button' className='text-blue-500 underline' onClick={() => setShowLogin(true)}>
            Already have an account? Log In
      </button>
    </div>
  );
};

export default EmailSignUp;