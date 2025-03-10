import React from 'react'
import './Heroimg.css'
import { useNavigate } from 'react-router-dom';


function Heroimg() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/productsell/0');
    };
    return (
        <div id='heroimg-container'>
            <div id='heroimg-text'>
                <div id='heroimg-title'>
                    <p id='heroimg-firstp'>Design and Build Your Unique
                        Mini Ecosystem</p>
                    <p id='heroimg-secondp'>Learn the art of combining plants, soil, and
                        decorative elements to craft a thriving,
                        self-sustaining ecosystem.</p>
                </div>
                <div id='heroimg-buttom'>
                    <button onClick={handleRedirect} id="heroimg-shop">Shop Now</button>
                </div>
                <div id='heroimg-basetxt'>Join Our Community to know more
                    We are waiting for you!</div>
            </div>
        </div>
    )
}

export default Heroimg
