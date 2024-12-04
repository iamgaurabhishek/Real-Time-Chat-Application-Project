import React, { useState } from 'react'
import Login from './Login';
import InputCard from './InputCard';
import EmailSignUp from './SignUpMethods/EmailSignUp';
import SwitchAuthForm from './SwitchAuthForm';

const SignUp = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  return (
    <div>
      {showLogin ? (
        <Login />
      ) : isLoading ?(
        <div className='text-center'>
          <p>{successMessage}</p>
        </div>
      ) : (
        <InputCard title="Sign Up" buttonText="Sign Up with Email">
          {/* Pass setShowLogin to EmailSignUp */}
          <EmailSignUp 
          setShowLogin={(success) => {
            if(success) {
              setIsLoading(true);
              setSuccessMessage("You have successfully signed up! Redirecting to login...");
              setTimeout(()=>{
                setIsLoading(false);
                setShowLogin(true);   // Redirect to login page
              }, 2000);     // Delay of 2 seconds
            }
          }}
          />

          <SwitchAuthForm question="Already have an account?" link="Log In" moveTo={()=> setShowLogin(true)}/>
        </InputCard>
      )}
    </div>
  )
}
export default SignUp;