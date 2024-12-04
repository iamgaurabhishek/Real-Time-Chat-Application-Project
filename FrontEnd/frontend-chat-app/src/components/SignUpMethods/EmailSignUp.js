import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { firebaseAuth } from '../../utils/firebase-config';
import { loginSuccess, setError, startLoading, stopLoading } from '../../redux/slice/authSlice';

const EmailSignUp = ({ setShowLogin, onSubmit }) => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);   // Access global Loading state

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // --------------------------------PASSWORD VALIDATION --------------------------------
    const isPasswordValid = (password, name) => {
      const nameRegex = new RegExp(name, 'i');  // Case-insensitive check for name
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
      return !nameRegex.test(password) && specialCharRegex.test(password);
    };
    //-------------------------------------------------------------------------------------

    const handleEmailSignUp = async (e) => {

      e.preventDefault();

      console.log("handleEmailSignUp called"); // Debug log to confirm function is called
      console.log("Form values: ", formValues); // Log current form values.

        if(formValues.password !== formValues.confirmPassword) {
            toast.error('Password do not match');
            return;
        }
        if(!isPasswordValid(formValues.password, formValues.name)) {
          toast.error('Password must contain at least one special character and cannot be your name');
          return;
        }
        if(formValues.password.length < 6){
          toast.error('Password must be at least 6 characters');
          return;
        }
        try{
          dispatch(startLoading());  // Start loading
            const userCredential = await createUserWithEmailAndPassword(
                firebaseAuth,
                formValues.email,
                formValues.password
            );
            const user = userCredential.user;
            dispatch(loginSuccess({ user, isNewUser: true }));
            toast.success("Email sign-up successful!");

            // Notify parent component of successful sign-up
            if(setShowLogin) {
              setShowLogin(true); // Navigate to Login page
            }
      
            // Call onSubmit to pass credentials back to parent
            // if(onSubmit){
            //   onSubmit({ name: formValues.name, email: formValues.email });
            // }

            // setShowLogin(true); // Optionally navigate to Login page
        }
        catch(error) {
            console.error("Firebase Error:", error); // Log the specific Firebase error
            const errorMessage = error.message || 'Email sign-up failed. Please try again.';
            dispatch(setError(errorMessage));
            toast.error("Email sign-up failed. Please try again");
            console.error("Error creating user: ", error);
        }
        finally{
          dispatch(stopLoading()); // Stop loading
        }
    };

  return (
    <div>
      <form onSubmit={handleEmailSignUp}>
      <input
            className='w-full border border-gray- rounded-lg p-2 mb-4'
            type='text'
            placeholder='Full Name'
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            required
      />
      <input 
            className='w-full border border-gray-300 rounded-lg p-2 mb-4'
            type='email'
            placeholder='Email'
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            required
      />
      <input
            className='w-full border border-gray-300 rounded-lg p-2 mb-4'
            type='password'
            placeholder='Password'
            value={formValues.password}
            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
            required
      />
      <input 
            className='w-full border border-gray-300 rounded-lg p-2 mb-4'
            type='password'
            placeholder='Confirm Password'
            value={formValues.confirmPassword}
            onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })}
            required
      />
      <button type="submit" className="bg-primary-color text-white py-2 px-4 rounded-lg">
        Sign Up With Email
      </button>
      </form>
    </div>
  );
};

export default EmailSignUp;

/*Note:
      When you are nesting a prop into another component, make sure that you are not passing it through form element twice. Once in the parent component and again in the child component. Make the form element nearest to the props, which means in the most cases you should pass it through form element of the child component.
*/