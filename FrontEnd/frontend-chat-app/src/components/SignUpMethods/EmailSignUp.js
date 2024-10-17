import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { firebaseAuth } from '../../utils/firebase-config';
import { loginSuccess } from '../../redux/slice/authSlice';

const EmailSignUp = ({ setShowLogin }) => {

    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleEmailSignUp = async (e) => {
        if(formValues.password !== formValues.confirmPassword) {
            toast.error('Password do not match');
            return;
        }
        try{
            const userCredential = await createUserWithEmailAndPassword(
                firebaseAuth,
                formValues.email,
                formValues.password
            );
            const user = userCredential.user;
            dispatch(loginSuccess({ user, isNewUser: true }));
            console.log("Email sign-up successful: ", user);
        }
        catch(error) {
            toast.error("Email sign-up failed. Please try again");
            console.error("Error creating user: ", error);
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
      />
      <input 
            className='w-full border border-gray-300 rounded-lg p-2 mb-4'
            type='email'
            placeholder='Email'
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
      />
      <input
            className='w-full border border-gray-300 rounded-lg p-2 mb-4'
            type='password'
            placeholder='Password'
            value={formValues.password}
            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
      />
      <input 
            className='w-full border border-gray-300 rounded-lg p-2 mb-4'
            type='password'
            placeholder='Confirm Password'
            value={formValues.confirmPassword}
            onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })}
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