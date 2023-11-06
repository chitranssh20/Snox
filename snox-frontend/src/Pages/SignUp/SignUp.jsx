import React from 'react'
import SignUpCP from '../../components/SignUp/SignUp'
import "./SignUp.css"
import TopBanner from '../../components/TopBanner/TopBanner'


const SignUp = () => {
  return (
    <>
            <TopBanner />
        <div className="signup-form-wrapper">
            <SignUpCP />
        </div>
    </>
  )
}

export default SignUp