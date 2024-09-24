import React from 'react'

const SwitchAuthForm = ({question, link, moveTo}) => {
  return (
    <div className="text-center mt-4">
      <span className="text-gray-500">{question}</span> {" "}
      <span className="text-blue-500 hover:underline cursor-pointer underline" onClick={moveTo}>{link}</span>
    </div>
  )
}

export default SwitchAuthForm