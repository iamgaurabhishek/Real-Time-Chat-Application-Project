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
            
        )}
      
    </div>
  )
}

export default Welcome
