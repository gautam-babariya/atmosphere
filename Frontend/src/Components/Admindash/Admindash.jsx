import React, { useEffect, useState } from 'react';
import './Admindash.css'
import logo from '../Navbar/storage/logo.svg'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admindash() {
    return (
        <div className="user-dashboard">
            <div className="user-info">
                <div className="profile-picture">
                    <div id='imgtitle-div'>
                        <img src={logo} alt="Profile" />
                        <div id='name-adjust'>
                            <h2>Admin</h2>
                            <p>admin@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div id='admin-box' className="userdash-footer">
                <Link to="/addproduct" className="user-footer-btn nav-sign-in-btn">
                    Add Product
                </Link>
                <Link to="/deleteproduct" className="user-footer-btn nav-sign-in-btn">
                    Delete Product
                </Link>
                <Link to="/allorders" className="user-footer-btn nav-sign-in-btn">
                    Orders
                </Link>
            </div>
        </div>
    )
}

export default Admindash
