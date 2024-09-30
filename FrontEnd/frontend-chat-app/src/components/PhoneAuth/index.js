import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { firebaseAuth } from '../../utils/firebase-config';
import { BsFillShieldLockFill, BsTelephoneFill} from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import OtpInput from 'otp-input-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaThumbsUp } from 'react-icons/fa';


const PhoneAuth = () => {
    const[otp, setOtp]= useState("");
    const[phoneNumber, setPhoneNumber]= useState("");
    const[loading, setLoading]= useState(false);
    const[showOTP, setShowOTP]= useState(false);
    const[user, setUser]= useState(null);

  return (
    <div className='p-4 flex flex-col justify-center text-center'>

    {
        showOTP  ? (
        <div className='flex flex-col justify-center items-center'>
            <div className='bg-primary-color text-white w-fit mx-auto p-4 rounded-full'>
                <BsFillShieldLockFill size={45}/>
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
            >
            </OtpInput>
            <button className='bg-primary-color text-white font-bold m-5 py-2.5 flex items-center justify-center rounded-lg text-xl'>
                {
                    loading && <CgSpinner size={30} className='mt-1 animate-spin'/>
                }
                <span className='mx-10'>Verify OTP</span>
            </button>
        </div> 
        )
        :
        (
        <div className='flex flex-col justify-center items-center'>
            <div className='bg-primary-color text-white w-fit mx-auto p-4 rounded-full'>
                <BsTelephoneFill size={45}/>
            </div>
            <label htmlFor='' className='font-bold text-xl text-center m-2'>
                Verify your Phone Number
            </label>
            <PhoneInput country={"ca"} value={phoneNumber} onChange={setPhoneNumber} />
            <button className='bg-primary-color text-white font-bold m-5 py-2.5 flex items-center justify-center rounded-lg text-xl'>
                {
                    loading && <CgSpinner size={30} className='mt-1 animate-spin'/>
                }
                <span className='mx-10'>Send code via SMS</span>
            </button>
        </div>
        )
    }

    <h2 className='text-center font-medium text-2xl flex justify-center items-center'>
        <FaThumbsUp className="mr-2 text-yellow-400" />Successfully Sign up
    </h2>

    </div>
  )
}

export default PhoneAuth;