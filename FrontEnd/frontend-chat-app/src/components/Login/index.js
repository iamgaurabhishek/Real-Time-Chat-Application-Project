import React, { useState } from 'react';
import InputCard from '../InputCard';
import SwitchAuthForm from '../SwitchAuthForm';
import SignUp from '../SignUp';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../utils/firebase-config';

const Login = () => {

    const [showSignUp, setShowSignUp] = useState(false);

    const handleSwitchToSignUp = () => {
        setShowSignUp(true);
    }

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try{
        const userCredentials = await signInWithEmailAndPassword(
            firebaseAuth,
            formValues.email,
            formValues.password
        );
        console.log("Logged in user: ",userCredentials.user);
    }
    catch(error){
        console.error("Logged in user: ",error);
        alert("Login failed, Please try again later");
    }
  };
  // If showLogin is true, render the Login component instead
  return (
    <div>
        {showSignUp ? (<SignUp />):(
    <InputCard title="Log In" buttonText="Log In" onSubmit={handleSignUpSubmit}>

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
      {/* Add the question and the option to switch to Login */}
      <SwitchAuthForm question="New user?" link="Sign up" moveTo={handleSwitchToSignUp}/>
    </InputCard>
        )}
    </div>
  );
};

export default Login;