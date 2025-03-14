import React, { useRef, useState } from 'react';
import './Login.css';
import logo from './storage/logo.svg'
import { Link } from 'react-router-dom';
import arrow from './storage/arrow.svg';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
        const backendurl = import.meta.env.VITE_BACKEND_URL;
        axios.post(`${backendurl}/api/auth/login`, productData)
            .then((Response) => {
                if (Response.data.message == "Invalid user") {
                    emailRef.current.style.border = '2px solid red';
                }
                else {
                    emailRef.current.style.border = ' 2px solid #5cb85c';
                }
                if (Response.data.message == "Invalid password") {
                    passRef.current.style.border = '2px solid red';
                }
                else {
                    passRef.current.style.border = ' 2px solid #5cb85c';
                }
                if (Response.data.message == "Login successful") {
                    localStorage.setItem('user_id', Response.data.user.id);
                    localStorage.setItem('mytoken', Response.data.token);
                    navigate('/');
                }
            })
    }
    return (
        <div className="signin-container">
            <div id='adjust-signin'>
                <Link className="back-button" to="/">
                    <img src={arrow} alt='arrow' />
                </Link>
                <div className="logo">
                    <img src={logo} alt="Tree Logo" id="logo-image" />
                </div>
                <h1 id="signin-title">Log in</h1>
                <input
                    type="email"
                    id="email-input"
                    name='email'
                    ref={emailRef}
                    onChange={handleChange}
                    placeholder="Enter Your E-mail Address"
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
                <Link className="new-user" to="/register">
                    New user register?
                </Link>
            </div>
        </div>
    );
}

export default Login;