import React, { useState } from 'react'
import Login from '../Login';
import InputCard from '../InputCard';
import EmailSignUp from '../SignUpMethods/EmailSignUp';
import GoogleSignUp from '../SignUpMethods/GoogleSignUp';
import PhoneSignUp from '../SignUpMethods/PhoneSignUp';
import SwitchAuthForm from '../SwitchAuthForm';

const SignUp = () => {
  const [signUpMethod, setSignUpMethod] = useState('email');
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      {showLogin ? (
        <Login />
      ) : (
        <InputCard title="Sign Up" buttonText="Sign Up">
          {signUpMethod === 'email' && <EmailSignUp setShowLogin={setShowLogin} />}
          {signUpMethod === 'google' && <GoogleSignUp />}
          {signUpMethod === 'phone' && <PhoneSignUp />}

          {/* Buttons to switch sign-up method */}
          <div className='flex justify-between items-center my-4'>
              <button 
                type='button' 
                className={`text-primary-color underline ${signUpMethod === 'email' ? "font-bold" : ""}`}
                onClick={() => setSignUpMethod('email')}
              >
                Sign Up with Email
              </button>
              <button
                type="button"
                className={`text-primary-color underline ${signUpMethod === 'google' ? "font-bold" : ""}`}
                onClick={() => setSignUpMethod('google')}
              >
                Sign Up with Google
              </button>
              <button
                type="button"
                className={`text-blue-500 underline ${signUpMethod === 'phone' ? 'font-bold' : ''}`}
                onClick={() => setSignUpMethod('phone')}
              >
                Sign Up with Phone Number
              </button>
          </div>
          <SwitchAuthForm question="Already have an account?" link="Log In" moveTo={()=> setShowLogin(true)}/>
        </InputCard>
      )}
    </div>
  )
}

export default SignUp
