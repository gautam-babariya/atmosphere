import React, { useEffect, useRef, useState } from 'react'
import './Adminlogin.css'
import logo from './storage/logo.svg'
import { Link } from 'react-router-dom';
import arrow from './storage/arrow.svg';
import { useNavigate } from "react-router-dom";


function Adminlogin() {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const uplode = (e) => {
        e.preventDefault();
        const productData = {
            email: data.email,
            password: data.password
        };
        localStorage.setItem('admin-id', productData.email);
        localStorage.setItem('admin-password', productData.password);
        navigate('/admin-dashboard');
    }
    return (
        <div className="signin-container">
            <div id='adjust-signin'>
                <Link className="back-button" to="/admin-dashboard">
                    <img src={arrow} alt='arrow' />
                </Link>
                <div className="logo">
                    <img src={logo} alt="Tree Logo" id="logo-image" />
                </div>
                <h1 id="signin-title">admin Log in</h1>
                <input
                    type="email"
                    id="email-input"
                    name='email'
                    ref={emailRef}
                    onChange={handleChange}
                    placeholder="Enter Your adminid"
                    required
                />
                <input
                    type="password"
                    name='password'
                    ref={passRef}
                    onChange={handleChange}
                    id="password-input"
                    placeholder="password"
                    required
                />
                <button onClick={uplode} id="signin-button">Sign in</button>
            </div>
        </div>
    )
}

export default Adminlogin
