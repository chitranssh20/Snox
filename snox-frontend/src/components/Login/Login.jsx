import React, { useEffect } from 'react'
import { useState } from 'react'
import "./Login.css"
import LoadingButton from '../LoadingButton/LoadingButton'
import { Link } from "react-router-dom";
import axiosInstance from '../axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
    const [emailId, setemailId] = useState("user@test.com");
    const [password, setpassword] = useState("test");
    const [emailError, setemailError] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [IsLoginAPiInProgress, setIsLoginAPiInProgress] = useState(false)


    const submitLogInForm = (e) => {
        e.preventDefault();
        if(emailId.trim() === ''){
          setemailError("Email field is mandatory")
          return;
        }
        if(password.trim() == ''){
          setpasswordError("Please Enter Password");
          return 
        }
        
        // Calling LogIn API
        setIsLoginAPiInProgress(true);
        const credentials = {
          "email": emailId,
          "password": password
        }
        axiosInstance.post('/users/login/', credentials).then((res)=>{
          if(res.status == 202){
            Cookies.set("JWT", res.data.token);
            Cookies.set("fname", res.data.info.fname)
            Cookies.set("lname", res.data.info.lname)
            navigate("/")
          }
        }).catch((err)=> {
          setpasswordError(err.response.data.response)
        })
        setIsLoginAPiInProgress(false)
        setemailId("");
        setpassword("");

    }


    useEffect(() => {
      
      if(emailId.trim() != ''){
        setemailError("");
      }
      if(password.trim() != ''){
        setpasswordError("");
      }
      
    }, [emailId, password])
    

  return (
    <>
    <div className="form-container">
      <div id="form-filler">
          <span id="form-snox-title">SNOX</span>
      </div>
        <form onSubmit={(e) =>  submitLogInForm(e)} className="forms" method='POST' >

                <div className="form-snippet-container">
                <label htmlFor="login-email" className='form-labels' >Email: </label>
                <input type="email" className='form-input' name='login-email' value={emailId} onChange={(e) => {setemailId(e.target.value)}} />
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
                <p className="form-alternate-caption">New To Snox?   
                    <Link to={"/signup"} className="form-alternate-caption-link"> Sign Up </Link>
                  </p>
        </form>

    </div>

    </>
  )
}

export default Login