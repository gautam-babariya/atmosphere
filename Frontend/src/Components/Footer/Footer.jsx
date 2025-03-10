import React from 'react';
import './Footer.css';
import Logo from './storage/logo.svg';
import { Link } from 'react-router-dom';
import facebook from './storage/facebook.svg';
import twitter from './storage/twitter.svg';
import linkedin from './storage/linekin.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <div className="footer-logo">
                    <img id='footer-img'  src={Logo} alt="logo" />
                </div>
                <div className="footer-text">
                    <p>Join Our Community to know more</p>
                    <p>We are waiting for you!</p>
                </div>
            </div>
            <div className="footer-center">
                <h4>Products</h4>
                <ul>
                    <li>Calathea Orbifolia</li>
                    <li>Calathea Orbifolia</li>
                    <li>Kuwu Potted Faux Fern</li>
                    <li>Indoor Houseplant</li>
                    <li>Calathea Orbifolia</li>
                    <li>Calathea Orbifolia</li>
                    <li>Kuwu Potted Faux Fern</li>
                    <li>Indoor Houseplant</li>
                </ul>
            </div>
            <div className="footer-right">
                <div>
                <h4>Get in touch</h4>
                <div className="footer-social-icons">
                    <img src={facebook} className="footer-icon" alt="facebook" />
                    <img src={twitter} className="footer-icon" alt="twitter" />
                    <img src={linkedin} className="footer-icon" alt="linkedin" />
                </div>
                </div>
                <div className="footer-subscribe">
                    <input type="email" placeholder="Enter email address" />
                    <button>Contact</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;