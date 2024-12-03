import React from 'react'
import { BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';

const PhoneNumberInput = ({ phoneNumber, setPhoneNumber, onSignup, loading }) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='bg-primary-color text-white w-fit mx-auto p-4 rounded-full'>
        <BsTelephoneFill size={45} />
      </div>
      <label className='font-bold text-xl text-center m-2'>
        Verify your Phone Number
      </label>
      <PhoneInput
        country={"ca"}
        value={phoneNumber}
        onChange={setPhoneNumber}
      />
      <button
        onClick={onSignup}
        className='bg-primary-color text-white font-bold m-5 py-2.5 flex items-center justify-center rounded-lg text-xl'
        disabled={loading}
        aria-label='Send code via SMS'
      >
        {loading && <CgSpinner size={30} className='mt-1 animate-spin' />}
        <span className='mx-10'>Send code via SMS</span>
      </button>
    </div>
  )
}

export default PhoneNumberInput;