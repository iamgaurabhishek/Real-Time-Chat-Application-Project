import React, { useState } from 'react';
import InputCard from '../InputCard';
import SwitchAuthForm from '../SwitchAuthForm';
import SignUp from '../SignUp';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { firebaseAuth, googleProvider } from '../../utils/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, clearMessage, loginSuccess, setError, setSucess, startDelay } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import SuccessfulMessage from '../SuccessfulMessage';
import DelayedNavigation from '../DelayedNavigation';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

    const [showSignUp, setShowSignUp] = useState(false);
    const [formValues, setFormValues] = useState({
      email: '',
      password: '',
    });

    const errorMessage = useSelector((state) => state.auth.error);  // Access the global error state
    const successMessage = useSelector((state) => state.auth.success); // Access the global success state
    const delayNavigation = useSelector((state) => state.auth.delayNavigation); // Access the global delay navigation state

    const handleSwitchToSignUp = () => {
        setShowSignUp(true);
    }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try{
        const userCredentials = await signInWithEmailAndPassword(
            firebaseAuth,
            formValues.email,
            formValues.password
        );
        dispatch(loginSuccess({ user: userCredentials.user, isNewUser: false }));
        dispatch(setSucess("Welcome! Successfully Loged In"));
        dispatch(startDelay());
        console.log("Logged in user: ",userCredentials.user);
        setTimeout(()=>{
          navigate('/dashboard');  // Navigate to the dashboard after successful login
          dispatch(clearMessage());
        },1000)
        
    }
    catch(error){
        console.error("Logged in user: ",error);
        dispatch(setError("Login failed. Please check your credentials and try again later.")); // Set the global error state
    }
  };
  // If showLogin is true, render the Login component instead

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const user = result.user;
      dispatch(loginSuccess({ user, isNewUser: false }));
      dispatch(clearMessage());
      navigate("/dashboard");
    } catch (error) {
      console.log("Google Login Error", error);
      dispatch("Google sign-in failed. Please try again.")
    }
  }
  return (
    <div>
        {showSignUp ? (<SignUp />):(
    <InputCard title="Log In" buttonText="Log In" onSubmit={handleLoginSubmit}>

      <input
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        type="email"
        placeholder="Email"
        value={formValues.email}
        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
      />
      <input
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        type="password"
        placeholder="Password"
        value={formValues.password}
        onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
      />
      {/* Google Login-In Button */}
      <button className='bg-blue-500 text-white py-2 px-4 rounded-lg mb-4' onClick={handleGoogleLogin}>
        Login in with Google
      </button>
      {/* Display global success message */}
      {successMessage && <SuccessfulMessage message={successMessage}/>}
      {/* Display the global error message if there is one */}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {/* Add the question and the option to switch to Login */}
      <SwitchAuthForm question="New user?" link="Sign up" moveTo={handleSwitchToSignUp}/>
      {/* Trigger the DelayNavigation component when delayNavigation is true */}
      {delayNavigation && <DelayedNavigation delayTime={1000} to="/dashboard" clearMessage={()=> dispatch(clearMessage())} />}
    </InputCard>
        )}
    </div>
  );
};

export default Login;