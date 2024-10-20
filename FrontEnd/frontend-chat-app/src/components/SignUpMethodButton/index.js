import React from 'react'

const SignUpMethodButton = ({type, label, currentMethod, onSwitchMethod}) => {
    const isActive = currentMethod === type;

  return (
    <button
        type='button'
        className={`text-primary-color underline ${isActive ? 'font-bold' : ''}`}
        onClick={() => onSwitchMethod(type)}
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onSwitchMethod(type)}
    >
      {label}
    </button>
  )
}
export default SignUpMethodButton;