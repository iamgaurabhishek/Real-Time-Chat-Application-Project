import React from 'react'
import ReactLoading from 'react-loading';
const LoadingSpinner = () => {
  return (
    <div>
      <ReactLoading type='cylon' color='#1476ff' height={400} width={200} />
    </div>
  )
}

export default LoadingSpinner;