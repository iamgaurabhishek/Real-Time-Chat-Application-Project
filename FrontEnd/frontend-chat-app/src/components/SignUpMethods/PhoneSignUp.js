import React from 'react'
// import PhoneAuth from '../PhoneAuth'
import PhoneAuth from '../PhoneAuth/PhoneAuth';
import { useDispatch, useSelector } from 'react-redux'
import { setErrorMessage, setSuccessMessage } from '../../redux/slice/messageSlice';
import ErrorMessage from '../ErrorMessage';
import SuccessfulMessage from '../SuccessfulMessage';

const PhoneSignUp = () => {

  const dispatch = useDispatch();

  //Access global error and success state from the new message slice
  const errorMessage = useSelector((state) => state.messages.error);
  const successMessage = useSelector((state) => state.messages.success);

  const handlePhoneAuthSuccess = (user) => {
    dispatch(setSuccessMessage('Phone sign up successful!')); // Dispatch success message
  }
  const handlePhoneAuthError = (error) => {
    dispatch(setErrorMessage('Phone sign up failed!')); // Dispatch error message
  };
  return (
    <div>
      <PhoneAuth onSuccess={handlePhoneAuthSuccess} onError={handlePhoneAuthError} />

      {/* Conditionally render error and success messages. */}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {successMessage && <SuccessfulMessage message={successMessage} />}
    </div>
  )
}

export default PhoneSignUp;