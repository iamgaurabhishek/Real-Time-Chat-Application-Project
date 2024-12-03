import React, { useEffect, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, linkWithCredential } from 'firebase/auth';
import { firebaseAuth } from '../../utils/firebase-config';
import 'react-phone-input-2/lib/style.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slice/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import OtpInputField from './OtpInputField';
import PhoneNumberInput from './PhoneNumberInput';


const PhoneAuth = ({firebaseUser}) => {
    const[otp, setOtp]= useState("");
    const[phoneNumber, setPhoneNumber]= useState("");
    const[loading, setLoading]= useState(false);
    const[showOTP, setShowOTP]= useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{
                size:'invisible',
                'callback': (response) => {
                    onSignup();
                },
                'expired-callback': () => {
                    toast.error('ReCaptcha expired.Please try again');
                },
            }, firebaseAuth)
        }
    },[])

    const onSignup = (e) =>{
        e.preventDefault();

        if(!phoneNumber){
            toast.error('Please enter a valid phone number');
            return;
        }

        setLoading(true);
        const appVerifier = window.recaptchaVerifier;
        const formatPhoneNumber = '+' + phoneNumber;
        
        signInWithPhoneNumber(firebaseAuth, formatPhoneNumber, appVerifier)
            .then((confirmationResult)=> {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success('OTP sended successfully');
            }).catch((error)=>{
                console.log("Error sending OTP: ", error);
                setLoading(false);
                toast.error('Failed to send OTP. Please try again');
            });
        };
    const onOTPVerify = async() =>{
        if(!otp){
            toast.error('Please enter the OTP.');
            return;
        }
        setLoading(true);
        try{
            const result = await window.confirmationResult.confirm(otp);
            const user = result.user;
            if(firebaseUser){
                const credential = PhoneAuthProvider.credential(window.confirmationResult.verificationId, otp);
                await linkWithCredential(firebaseUser, credential);
                toast.success('Phone number linked to your account!');
            }
            // Dispatch to Redux
            dispatch(loginSuccess({user, isNewUser: true}));
            setLoading(false);
            toast.success("OTP verified successfully");
        }
        catch(error){
            console.log(error);
            setLoading(false);
            toast.error('OTP verification failed. Please try again');
        }
    };
  return (
    <div className='p-4 flex flex-col justify-center text-center'>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id='recaptcha-container'></div>
        {showOTP ? (
            <OtpInputField otp={otp} setOtp={setOtp} onOTPVerify={onOTPVerify} loading={loading}/>
    ) : (
        <PhoneNumberInput
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            onSignup={onSignup}
            loading={loading}
        />
    )}
</div>
  )
}

export default PhoneAuth;