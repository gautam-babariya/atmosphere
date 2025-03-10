import React from 'react';
import './Signin.css';
import logo from './storage/logo.svg'
import { Link } from 'react-router-dom';
import arrow from './storage/arrow.svg'

const Signin = () => {
    return (
        <div className="signin-container">
            <div id='adjust-signin'>
            <Link className="back-button" to="/">
            <img src={arrow} alt='arrow' />
            </Link>
            <div className="logo">
                <img src={logo} alt="Tree Logo" id="logo-image" />
            </div>
            <h1 id="signin-title">Sign in</h1>
            <input
                type="email"
                id="email-input"
                placeholder="Enter Your E-mail Address"
                required
            />
            <input
                type="password"
                id="password-input"
                placeholder="password"
                required
            />
            <button id="signin-button">Sign in</button>
            </div>
        </div>
    );
}

export default Signin;