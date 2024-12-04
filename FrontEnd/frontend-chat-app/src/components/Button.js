import React from 'react'

const Button = ({
    label = 'Button',
    type = 'button',
    className = '',
    disabled = false,
}) => {
  return (
    <button type={type} className={`${className}`} disabled={disabled}>
        {label}
    </button>
  )
}

export default Button
