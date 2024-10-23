import React from 'react'
import { BsFillShieldLockFill } from 'react-icons/bs';
import OtpInput from 'otp-input-react';
import { CgSpinner } from 'react-icons/cg';
const OtpInputField = ({ otp, setOtp, onOTPVerify, loading}) => {
  return (
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
            aria-label="OTP input"
            className="flex justify-between gap-2"
        />
        <button
            onClick={onOTPVerify} 
            className='bg-primary-color text-white font-bold m-5 py-2.5 flex items-center justify-center rounded-lg text-xl'
            disabled={loading}
            aria-label='Verify OTP'
        >
            {loading && <CgSpinner size={30} className='mt-1 animate-spin' />}
            <span className='mx-10'>Verify OTP</span>
        </button>
    </div>
  )
}

export default OtpInputField;