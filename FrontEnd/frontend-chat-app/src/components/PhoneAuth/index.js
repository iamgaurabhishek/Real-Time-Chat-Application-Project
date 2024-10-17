import React, { useEffect, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, linkWithCredential } from 'firebase/auth';
import { firebaseAuth } from '../../utils/firebase-config';
import { BsFillShieldLockFill, BsTelephoneFill} from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import OtpInput from 'otp-input-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/slice/authSlice';
import toast, { Toaster } from 'react-hot-toast';


const PhoneAuth = ({firebaseUser}) => {
    const[otp, setOtp]= useState("");
    const[phoneNumber, setPhoneNumber]= useState("");
    const[loading, setLoading]= useState(false);
    const[showOTP, setShowOTP]= useState(false);
    const dispatch = useDispatch();

    useEffect(()=> {
        if(!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{
                size:'invisible',
                'callback': (response) => {
                    onSignup();
                },
                'expired-callback': () => {
                    toast.error('ReCaptcha expired.Please try again');
                }
            }, firebaseAuth)
        }
    },[])

    function onSignup(){
        setLoading(true);
        // onCaptchVerify();
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
    }

    const onOTPVerify = async() =>{
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
        <div className='flex flex-col justify-center items-center bg-green-400'>
            <div className='bg-primary-color text-white w-fit mx-auto p-4 rounded-full'>
                <BsFillShieldLockFill size={45} />
            </div>
            <label htmlFor='otp' className='font-bold text-2xl text-center m-2'>
                Enter your OTP
            </label>
            <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                className="flex justify-between gap-2"
            />
            <button onClick={onOTPVerify} className='bg-primary-color text-white font-bold m-5 py-2.5 flex items-center justify-center rounded-lg text-xl'>
                {loading && <CgSpinner size={30} className='mt-1 animate-spin' />}
                <span className='mx-10'>Verify OTP</span>
            </button>
        </div>
    ) : (
        <div className='flex flex-col justify-center items-center'>
            <div className='bg-primary-color text-white w-fit mx-auto p-4 rounded-full'>
                <BsTelephoneFill size={45} />
            </div>
            <label htmlFor='' className='font-bold text-xl text-center m-2'>
                Verify your Phone Number
            </label>
            <PhoneInput country={"ca"} value={phoneNumber} onChange={setPhoneNumber} />
            <button onClick={onSignup} className='bg-primary-color text-white font-bold m-5 py-2.5 flex items-center justify-center rounded-lg text-xl'>
                {loading && <CgSpinner size={30} className='mt-1 animate-spin' />}
                <span className='mx-10'>Send code via SMS</span>
            </button>
        </div>
    )}
</div>
  )
}

export default PhoneAuth;