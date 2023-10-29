import React from 'react'
import { useState } from 'react'
import "./Login.css"
import LoadingButton from '../LoadingButton/LoadingButton'
import { Link } from "react-router-dom";
const Login = () => {
    const [emailId, setemailId] = useState("test");
    const [password, setpassword] = useState("test");
    const [emailError, setemailError] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [IsLoginAPiInProgress, setIsLoginAPiInProgress] = useState(false)


    const submitLogInForm = (e) => {
        e.preventDefault();
        window.alert("This is form triggered");
        setemailId("");
        setpassword("");
        // TODO: Call the API

    }

  return (
    <>
    <div id="form-container">
      <div id="form-filler">
          <span id="form-snox-title">SNOX</span>
      </div>
        <form onSubmit={(e) =>  submitLogInForm(e)} className="forms" method='POST' >

                <div className="form-snippet-container">
                <label htmlFor="login-email" className='form-labels' >Email: </label>
                <input type="text" className='form-input' name='login-email' value={emailId} onChange={(e) => {setemailId(e.target.value)}} />
                <span className="form-error-field" > {emailError} </span>
                </div>
                
                <div className="form-snippet-container">
                <label htmlFor="login-password" className='form-labels'  >Password</label>
                <input type="password" className='form-input' name='login-password' value={password} onChange={(e) => {setpassword(e.target.value)}}  />
                <span className="form-error-field" > {passwordError} </span>
                </div>
                

                {
                  IsLoginAPiInProgress ? <>
                <div className="form-loading-button-wrapper">
                <LoadingButton />
                </div>
                  </>:
                  <>
                  <button className="form-button" type='submit' >LogIn</button>
                  </>
                }
                <p id="form-alternate-caption">New To Snox?   
                    <Link to={"/signup"} id="form-alternate-caption-link"> Sign Up </Link>
                  </p>
        </form>

    </div>

    </>
  )
}

export default Login