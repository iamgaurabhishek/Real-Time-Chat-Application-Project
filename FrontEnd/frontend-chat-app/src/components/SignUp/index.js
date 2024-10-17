import React, { useState } from 'react';
import InputCard from '../InputCard';
import SwitchAuthForm from '../SwitchAuthForm';
import Login from '../Login';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { firebaseAuth, googleProvider } from '../../utils/firebase-config';
import PhoneAuth from '../PhoneAuth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slice/authSlice';
import toast from 'react-hot-toast';

const SignUp = () => {

    // State to track the sign-up method
    const [signUpMethod, setSignUpMethod] = useState('email');
    const [showLogin, setShowLogin] = useState(false);
    const [firebaseUser, setFirebaseUser] = useState(null);
    const dispatch = useDispatch();

    // New code------------------------------------------------------------------------------   
    const handleGoogleSignUp = async () => {
        try{
            const result = await signInWithPopup(firebaseAuth, googleProvider);
            const user = result.user;
            dispatch(loginSuccess({ user, isNewUser: true }));
            console.log('Google sign-in successful: ', user);
        }
        catch(error){
            console.log('Google sign-up failed: ', error);
            toast.error("Google sign-up failed. Please try again");
        }
    };
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
      });

      const handleEmailSignUp = async (e) => {
        e.preventDefault();
        if(formValues.password !== formValues.confirmPassword){
            toast.error('Passwords do not match');
            return;
        }
        try{
            const userCredential = await createUserWithEmailAndPassword(
                firebaseAuth,
                formValues.email,
                formValues.password
            );
            const user = userCredential.user;
            dispatch(loginSuccess({ user, isNewUser: true }));
            console.log('Email sign-up successful: ', user);
        }
        catch(error){
            console.log('Email sign-up failed', error);
            toast.error("Email sign-up failed. Please try again");
        }
      };
//   const handleSwitchToSignUp = () => {
//         setShowLogin(true);
//     }

//   const handleSignUpSubmit = async (e) => {
//     e.preventDefault();
//------------------------------------------------- Old code ----------------------------------------------------------------

    
//     if(formValues.password !== formValues.confirmPassword) {
//         alert('Password do not match');
//         return;
//     }
//     try{
//         const userCredential = await createUserWithEmailAndPassword(
//             firebaseAuth,
//             formValues.email,
//             formValues.password
//         );
//         setFirebaseUser(userCredential.user); //Store the Firebase user after email signup
//         console.log('Registered user: ', userCredential.user);

//         // Dispatch the user to the Redux store
//         dispatch(loginSuccess({ user: userCredential.user, isNewUser: true }));
//     }
//     catch(error){
//         console.log('Sign-up failed: ', error);
//         alert("Sign-up failed. Please try again");
//     }
//   };

  // If showLogin is true, render the Login component instead
  return (
    <div>
        {showLogin ? (
        <Login />
      ) : (
        <InputCard 
        title="Sign Up" 
        buttonText="Sign Up" 
        // onSubmit={handleSignUpSubmit}
        >
          {signUpMethod === 'email' && (
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
              <button onClick={handleEmailSignUp} className="bg-primary-color text-white py-2 px-4 rounded-lg">
                Sign Up With Email
              </button>
            </>
          )}
          {signUpMethod === "google" &&(
            <button onClick={handleGoogleSignUp} className="bg-red-500 text-white py-2 px-4 rounded-lg">
                Sign Up with Google
            </button>
          )}
          {/* Buttons to switch sign-up methods */}
          <div className="flex justify-between items-center my-4">
            <button 
              type='button'
              className={`text-primary-color underline ${signUpMethod === 'email' ? "font-bold": ""}`}
              onClick={() => setSignUpMethod('email')}
              >
                    Sign Up with Email
            </button>
            <button 
                type='button'
                className={`text-primary-color underline ${signUpMethod === 'google' ? "font-bold": ""}`}
                onClick={() => setSignUpMethod('google')}
                >
                    Sign Up with Google
            </button>
            <button
                type='button'
                className={`text-blue-500 underline ${signUpMethod === 'phone' ? 'font-bold' : ''}`}
                onClick={() => setSignUpMethod('phone')}
                >
                    Sign Up with Phone Number
                </button>
          </div>
           {/* (
            <PhoneAuth firebaseUser={firebaseUser} /> // Use the PhoneAuth component for phone number sign-up
          )}
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
          </div> */}
          <SwitchAuthForm question="Already have an account?" link="Log In" moveTo={() => setShowLogin(true)} />
        </InputCard>
      )}
    </div>
  );
};

export default SignUp;