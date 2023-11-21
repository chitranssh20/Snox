import React from 'react'
import "./SignUp.css"
import { useState } from 'react'
import LoadingButton from '../LoadingButton/LoadingButton'
import { Link } from "react-router-dom";
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState("user@test.com")
    const [password, setpassword] = useState("test")
    const [phone, setphone] = useState("7878787878")
    const [city, setcity] = useState("Delhi")
    const [street, setstreet] = useState("JanPath")
    const [fname, setfname] = useState("User")
    const [lname, setlname] = useState("Test")
    const [IsSignUpFormLInProgress, setIsSignUpFormLInProgress] = useState(false)

    const [emailError, setemailError] = useState("")
    const [passwordError, setpasswordError] = useState("")
    const [phoneError, setphoneError] = useState("")
    const [cityError, setcityError] = useState("")
    const [streetError, setstreetError] = useState("")
    const [fnameError, setfnameError] = useState("")
    const [lnameError, setlnameError] = useState("")

    const submitSignUpForm = (e) => {
        e.preventDefault();
        if(email.trim() == ''){
            setemailError("Email must be provided");
            return;
        }
        if(password.trim() == ''){
            setpasswordError("Password must be provided");
            return;
        }
        if(phone.toString().length > 10 ){ setphoneError("Phone number can't be longer than 10 digits");
         return;
        }
        if(city.trim() == ''){
            setcityError("City must be provided");
            return;
        }
        if(street.trim() == ''){
            setstreetError("Street must be provided");
            return;
        }
        if(fname.trim() == ''){
            setfnameError("First name cannot be empty");
            return;
        }
        if(lname.trim() == ''){
            setlnameError("Last name cannot be empty");
            return;
        }

        // Calling Sign Up API
        const credentials  = {
            "email": email,
            "fname": fname,
            "lname": lname,
            "password": password,
            "phone": phone,
            "street":street,
            "city": city 
        }
        axiosInstance.post('/users/register/', credentials).then((res)=>{
            if(res.status == 201){
                Cookies.set("JWT", res.data.token);
                Cookies.set("fname", res.data.info.fname)
                Cookies.set("lname", res.data.info.lname)
                navigate("/")
            }
        }).catch((err)=>{
            setemailError(err.response.data.response);
        })



    }


    React.useEffect(() => {
      if(email.trim() != '' ){
        setemailError("");
      }
      if(password.trim() != ''){
        setpasswordError("")
      }
      if(fname.trim() != ""){
        setfnameError("");
      }
      if(lname.trim() != ""){
        setlnameError("");
      }
      if(street.trim() != ''){
        setstreetError("");
      }
      if(city.trim() != ""){
        setcityError("");
      }

    
    }, [email, phone, password, fname, lname, city, street])
    



    return (
        <>
            <div className="form-container">
                <form className='forms' onSubmit={(e) => {submitSignUpForm(e)}} id='signUp-form' method='post'>
                    <div className="form-bifield-container">

                        <div className="form-snippet-container">
                            <label htmlFor="signup-fname" className='form-label'  >First Name:</label>
                            <input type="text" name="signup-fname" className='form-input' value={fname} onChange={(e) => {setfname(e.target.value)}} id="signup-fname" />
                            <span className="form-error-field" > {fnameError} </span>

                        </div>

                        <div className="form-snippet-container">
                            <label htmlFor="signup-lname">Last Name:</label>
                            <input type="text" className='form-input' value={lname} onChange={(e) => {setlname(e.target.value)}}  name="signup-lname" id="signup-lname" />
                            <span className="form-error-field" > {lnameError} </span>
                        </div>
                    </div>

                    <div className="form-snippet-container">
                        <label className='form-label' htmlFor="signup-email">Email:</label>
                        <input type="email" name="signup-email" id="signup-email" className='form-input' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <span className="form-error-field" > {emailError} </span>
                    </div>
                    <div className="form-snippet-container">
                        <label className='form-label' htmlFor="signup-password">Password:</label>
                        <input type="password" className='form-input' name="signup-password" id="signup-password" value={password} onChange={(e) => setpassword(e.target.value)} />
                        <span className="form-error-field" > {passwordError} </span>
                    </div>


                    <div className="form-bifield-container">
                    <div className="form-snippet-container">
                        <label className='form-label' htmlFor="signup-phone">Phone:</label>
                        <input className='form-input' type="number" name="signup-phone"  id="signup-phone" value={phone} onChange={(e) => { setphone(e.target.value) }} />
                        <span className="form-error-field" > {phoneError} </span>
                    </div>


                        <div className="form-snippet-container">
                            <label className='form-label' htmlFor="signup-city">City:</label>
                            <input className='form-input' type="text" name="signup-city" id="signup-city" value={city} onChange={(e) => { setcity(e.target.value) }} />
                            <span className="form-error-field" > {cityError} </span>
                        </div>

                    </div>
                        <div className="form-snippet-container">
                            <label className='form-label' htmlFor="signup-street">Street:</label>
                            <input className='form-input' type="text" name="signup-street" id="signup-street" value={street} onChange={(e) => { setstreet(e.target.value) }} />
                            <span className="form-error-field" > {streetError} </span>
                        </div>

                    {
                        IsSignUpFormLInProgress ?
                            <>
                                <div className="form-loading-button-wrapper">
                                    <LoadingButton />
                                </div>
                            </>
                            :
                            <>
                                <button className="form-button" type='submit' >Sign Up</button>
                            </>
                    }

                    <p className="form-alternate-caption">Already Registered?
                        <Link to={"/login"} className="form-alternate-caption-link"> LogIn </Link>
                    </p>

                </form>

            </div>
        </>
    )
}

export default SignUp