import React, { useState } from 'react'
import Login from '../Login';
import InputCard from '../InputCard';
import EmailSignUp from '../SignUpMethods/EmailSignUp';
import GoogleSignUp from '../SignUpMethods/GoogleSignUp';
import PhoneSignUp from '../SignUpMethods/PhoneSignUp';
import SwitchAuthForm from '../SwitchAuthForm';
import SignUpMethodButton from '../SignUpMethodButton';

const SignUp = () => {
  const [signUpMethod, setSignUpMethod] = useState('email');
  const [showLogin, setShowLogin] = useState(false);

  // Function to console.log the user credentials!
  const handleUserCredentials = (credentials) => {
    console.log("User credentials", credentials);
  }

  const handleMethodSwitch = (e, method) => {
    e.preventDefault();
    setSignUpMethod(method);
  }

  return (
    <div>
      {showLogin ? (
        <Login />
      ) : (
        <InputCard title="Sign Up" buttonText="Sign Up with Email">
          {signUpMethod === 'email' && <EmailSignUp setShowLogin={setShowLogin}  onSubmit={handleUserCredentials} />}
          {signUpMethod === 'google' && <GoogleSignUp onSubmit={handleUserCredentials} />}
          {signUpMethod === 'phone' && <PhoneSignUp onSubmit={handleUserCredentials} />}

          {/* Buttons to switch sign-up method */}
          <div className='flex justify-between items-center my-4'>
              <SignUpMethodButton
                  type="email"
                  label="Sign Up with Email"
                  currentMethod={signUpMethod}
                  onSwitchMethod={handleMethodSwitch}
              />             
              <SignUpMethodButton
                  type="google"
                  label="Sign Up with Google"
                  currentMethod={signUpMethod}
                  onSwitchMethod={handleMethodSwitch}
              />             
              <SignUpMethodButton
                  type="phone"
                  label="Sign Up with Phone Number"
                  currentMethod={signUpMethod}
                  onSwitchMethod={handleMethodSwitch}
              />             
          </div>
          <SwitchAuthForm question="Already have an account?" link="Log In" moveTo={()=> setShowLogin(true)}/>
        </InputCard>
      )}
    </div>
  )
}
export default SignUp;