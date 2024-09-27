import React, { useState } from 'react';
import InputCard from '../InputCard';
import SwitchAuthForm from '../SwitchAuthForm';
import Login from '../Login';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../utils/firebase-config';

const SignUp = () => {

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


  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    
    if(formValues.password !== formValues.confirmPassword) {
        alert('Password do not match');
        return;
    }
    try{

    }
    catch(error){
        console.log('Sign-up failed: ', error);
        alert("Sign-up failed. Please try again");
    }
  };

  // If showLogin is true, render the Login component instead
  return (
    <div>
        {showLogin ? (<Login />):(
        <InputCard title="Sign Up" buttonText="Sign Up" onSubmit={handleSignUpSubmit}>
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

        {/* Add the question and the option to switch to Login */}
        <SwitchAuthForm question="Already have an account?" link="Log In" moveTo={handleSwitchToSignUp}/>
        </InputCard>
        )}
    </div>
  );
};

export default SignUp;
