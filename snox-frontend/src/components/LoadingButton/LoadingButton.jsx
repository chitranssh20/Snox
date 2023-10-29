import React from 'react'
import "./LoadingButton.css"

const LoadingButton = () => {
  return (
    <>
        <button id="loading-button">
            <div className="loading-button-dots"></div>
            <div className="loading-button-dots"></div>
            <div className="loading-button-dots"></div>
        </button>
    </>
  )
}

export default LoadingButton