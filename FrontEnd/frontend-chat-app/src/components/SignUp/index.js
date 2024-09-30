import React, { useState } from 'react';
import InputCard from '../InputCard';
import SwitchAuthForm from '../SwitchAuthForm';
import Login from '../Login';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { firebaseAuth } from '../../utils/firebase-config';
import PhoneAuth from '../PhoneAuth';

const SignUp = () => {

    // State to track the sign-up method
    const [signUpMethod, setSignUpMethod] = useState('email');
    const [showLogin, setShowLogin] = useState(false);

    const handleSwitchToSignUp = () => {
        setShowLogin(true);
    }

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    
    if(formValues.password !== formValues.confirmPassword) {
        alert('Password do not match');
        return;
    }
    try{
        const userCredential = await createUserWithEmailAndPassword(
            firebaseAuth,
            formValues.email,
            formValues.password
        );
        console.log('Registered user: ', userCredential.user);
    }
    catch(error){
        console.log('Sign-up failed: ', error);
        alert("Sign-up failed. Please try again");
    }
  };

  // If showLogin is true, render the Login component instead
  return (
    <div>
        {showLogin ? (
        <Login />
      ) : (
        <InputCard title="Sign Up" buttonText="Sign Up" onSubmit={handleSignUpSubmit}>
          {signUpMethod === 'email' ? (
            <>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                type="text"
                placeholder="Name"
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              />
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
              <input
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                type="password"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })}
              />
            </>
          ) : (
            <PhoneAuth /> // Use the PhoneAuth component for phone number sign-up
          )}
          {/* Buttons to switch between Email/Phone Sign-up method */}
          <div className="flex justify-between items-center my-4">
            <button
              type="button"
              className={`text-blue-500 underline ${signUpMethod === 'email' ? 'font-bold' : ''}`}
              onClick={() => setSignUpMethod('email')}
            >
              Sign up with Email
            </button>
            <button
              type="button"
              className={`text-blue-500 underline ${signUpMethod === 'phone' ? 'font-bold' : ''}`}
              onClick={() => setSignUpMethod('phone')}
            >
              Sign up with Phone Number
            </button>
          </div>
          <SwitchAuthForm question="Already have an account?" link="Log In" moveTo={handleSwitchToSignUp} />
        </InputCard>
      )}
    </div>
  );
};

export default SignUp;