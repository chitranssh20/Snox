import React from 'react'
import TopBanner from '../components/TopBanner/TopBanner'
import LoginCp from '../components/Login/Login'
import "./Login.css"
const Login = () => {
  return (
    <>
    {/* <TopBanner /> */}
    <div className="login-form-wrapper">
    <LoginCp />
    </div>
    </>
  )
}

export default Login