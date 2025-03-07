import React from 'react'
import './Navbar.css'
import logo from './storage/logo.svg'
import user from './storage/user.svg'

function Navbar({Login}) {
    return (
        <div className="nav-auth-container">
            <img src={logo} alt="Logo" className="nav-logo" />
            <div id='nav-auth'>
                <div className="nav-search-container">
                    <input type="text" className="nav-search-input" placeholder="Search.." />
                    <button className="nav-search-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" id='nav-searchicon' width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>
                <div className="nav-sign-in-container">
                    {Login ? (
                        <img src={user} alt="User Profile" id='nav-user-ac' />
                    ) : (
                        <>
                            <button className="nav-sign-in-btn">Sign in</button>
                            <button className="nav-sign-in-btn">Log in</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar
