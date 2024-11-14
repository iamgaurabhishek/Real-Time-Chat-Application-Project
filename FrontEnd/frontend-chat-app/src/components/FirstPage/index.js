import React from 'react';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/users/login'); // Navigate to the login route
  };

  return (
    <div className="bg-white w-[600px] h-auto shadow-lg rounded-lg flex flex-col justify-center items-center p-8">
      <h1 className="text-4xl font-extrabold mb-2">Welcome</h1>
      <div className="text-2xl font-light mb-4">Sign up to get started</div>
      
      {/* ----------------------- */}
      {/* Login Button */}
      <div className="mb-4">
            Are you here for{" "}
            <button className="text-blue-500 font-semibold" onClick={() => navigate('/users/login')}>
              Login
            </button>{" "}
            or for{" "}
            {/* Sign Up Button */}
            <button className="text-blue-500 font-semibold" onClick={() => navigate('/users/signup')}>
              SignUp
            </button>
          </div>
          {/* ----------------------- */}
    </div>
  );
};

export default FirstPage;
