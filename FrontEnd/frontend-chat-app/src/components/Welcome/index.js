import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

    const user = useSelector(state => state.auth.user);
    const isNewUser = useSelector(state => state.auth.isNewUser);
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        navigate('/');
    };
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <h1 className='text-3xl font-bold'>Welcome {user?.name || "User"}!</h1>

        {isNewUser ? (
            <div className='text-center mt-4'>
                <p className='text-lg'>We are excited to have you! Since you're new, here are some tips to get started:</p>
                <ul className='list-disc mt-2'>
                    <li>Explore your profile settings</li>
                    <li>Get familiar with the Dashboard features</li>
                    <li>Feel free to reach out to support for assistance</li>
                </ul>
                <button className='mt-6 bg-primary-color text-white py-2 px-4 rounded'
                onClick={handleGoToDashboard}>Go to Dashboard</button>
            </div>
        ) : (
            <div className='text-center mt-4'>
                <p className='text-lg'>Welcome back! Here's what's new since your last visit:</p>
                <ul className='list-disc mt-2'>
                    <li>Will come to this section later to make it more reasonable.</li>
                </ul>
                <button className='mt-6 bg-primary-color text-white py-2 px-4 rounded'
                onClick={handleGoToDashboard}>Go to Dashboard</button>
            </div>
        )}
    </div>
  );
};

export default Welcome;