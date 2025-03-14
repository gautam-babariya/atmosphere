import React, { useEffect, useRef, useState } from 'react';
import './Signin.css';
import logo from './storage/logo.svg'
import { Link } from 'react-router-dom';
import arrow from './storage/arrow.svg'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate();
    const cloudinaryRef = useRef();
    const widgetref = useRef();
    const cloude_name = import.meta.env.VITE_CLOUD_NAME;
    const uploadpresent = import.meta.env.VITE_CLOUD_UPLOADPRESENT;
    const changemeRef = useRef(null);

    const [data, setData] = useState({
        name: "",
        address: "",
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
            name: data.name,
            address: data.address,
            email: data.email,
            password: data.password,
            dpurl: localStorage.getItem('DPimgurl')
        };
        const backendurl = import.meta.env.VITE_BACKEND_URL;
        axios.post(`${backendurl}/api/auth/register`, productData)
            .then((Response) => {
                localStorage.setItem('user_id', Response.data.user.id);
                localStorage.setItem('mytoken', Response.data.token);
                navigate('/');
            })
    }

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetref.current = cloudinaryRef.current.createUploadWidget({
            cloudName: cloude_name,
            uploadPreset: uploadpresent,
            // folder: 'user_profiles'
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                localStorage.setItem('DPimgurl', result.info.secure_url);
                const changeme = document.querySelector('#toggleme');
                if (changeme) {
                    changeme.style.display = 'block';
                }
            } else if (error) {
                console.error('Error during upload:', error);
            }
        });
    }, [])

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
                <button ref={changemeRef} onClick={() => widgetref.current.open()} id="dp-button">Upload Picture</button>
                <p id='toggleme'>Image Uploaded</p>
                <input
                    type="text"
                    name='name'
                    id="name-input"
                    placeholder="name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name='address'
                    id="address-input"
                    placeholder="address"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name='email'
                    id="email-input"
                    placeholder="Enter Your E-mail Address"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name='password'
                    id="password-input"
                    placeholder="password"
                    onChange={handleChange}
                    required
                />
                <button onClick={uplode} id="signin-button">Sign in</button>
                <Link className="new-user" to="/login">
                    Already register?
                </Link>
            </div>
        </div>
    );
}

export default Signin;