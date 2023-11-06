import React from 'react'
import "./SignUp.css"
import { useState } from 'react'
import LoadingButton from '../LoadingButton/LoadingButton'
import { Link } from "react-router-dom";

const SignUp = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [phone, setphone] = useState("")
    const [city, setcity] = useState("")
    const [street, setstreet] = useState("")
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
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

    }



    return (
        <>
            <div className="form-container">
                <form className='forms' onSubmit={(e) => {submitSignUpForm(e)}} id='signUp-form' method='post'>
                    <div className="form-bifield-container">

                        <div className="form-snippet-container">
                            <label htmlFor="signup-fname" className='form-label'  >First Name:</label>
                            <input type="text" name="signup-fname" className='form-input' id="signup-fname" />
                            <span className="form-error-field" > {fnameError} </span>

                        </div>

                        <div className="form-snippet-container">
                            <label htmlFor="signup-lname">Last Name:</label>
                            <input type="text" className='form-input' name="signup-lname" id="signup-lname" />
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
                        <input className='form-input' type="text" name="signup-phone" maxLength={10} id="signup-phone" value={phone} onChange={(e) => { setphone(e.target.value) }} />
                        <span className="form-error-field" > {phoneError} </span>
                    </div>


                        <div className="form-snippet-container">
                            <label className='form-label' htmlFor="signup-city">City:</label>
                            <input className='form-input' type="text" name="signup-city" id="signup-city" value={city} onChange={(e) => { SVGFETurbulenceElement(e.target.value) }} />
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