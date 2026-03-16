    import React, { useState } from 'react'
    import './LoginPopup.css'
    import { assets } from '../../assets/assets';
    export default function LoginPopup({setShowLogin}) {

        const [currState, setCurrState] = useState("Log In");
    return (
        <div className='login-popup'>
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState  }</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-input">
                    {currState === 'Log In' ? <></> : <input  type="text" placeholder='Your Name' required />}
                    
                    <input type="email" placeholder='Your Email' required />
                    <input type="password" placeholder='Your password' required />
                </div>
                {currState === 'Log In'? <button>Log In</button> :  <button>Create Account</button>}
                <div className="login-popup-condition">
                    <input type="checkbox"  required/>
                    <p>By Continuing, i agree to the terms of use & privacy policy </p>
                </div>
                {   
                    currState === 'Log In'
                    ?
                    <p>Create A New Account? <span onClick={() => setCurrState('Sign Up')}>Click Here</span></p> 
                    :<p>Already have a account? <span onClick={() => setCurrState('Log In')}> Login Here</span></p>
                }
                    
            </form>
        </div>
    )
    }
