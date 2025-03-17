import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from './storage/logo.svg'
import user from './storage/user.svg'
import AddCart from '../Addcart/Addcart'
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const backendurl = import.meta.env.VITE_BACKEND_URL;
import { motion } from 'framer-motion';


function Navbar() {
    const [isVerified, setIsVerified] = useState(false);
    const divRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const filteredSuggestions = suggestions.filter(item =>
        item.toLowerCase().includes(searchValue.toLowerCase())
    ).slice(0, 7);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Trigger the effect when the component mounts
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState); // Correct state update
    };
    const basepath = location.pathname.split('/').slice(0, 2).join('/');
    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };
    const handelSearch = () => {
        if (searchValue == '') {
            navigate('/productsell/0');
        }
        else {
            const trimmedText = searchValue.replace(' ', '');
            navigate(`/productsell/${trimmedText}`);
            setSearchValue('')
        }
    }
    useEffect(() => {
        axios.get(`${backendurl}/api/products`)
            .then(response => {
                const productNames = response.data.map(product => product.name);
                setSuggestions(productNames);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);
    useEffect(() => {
        try {
            const productData = {
                user_id: localStorage.getItem('user_id'),
                mytoken: localStorage.getItem('mytoken'),
            };
            const backendurl = import.meta.env.VITE_BACKEND_URL;
            axios.post(`${backendurl}/api/auth/verify`, productData)
                .then((Response) => {
                    if (Response.data.message == "Token and user ID are valid") {
                        setIsVerified(true)
                    }
                    else {
                        setIsVerified(false)
                    }
                })
        } catch {
            setIsVerified(false);
        }
    }, []);

    const [cartOpen, setCartOpen] = useState(false);
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-blue-500 text-black rounded-lg"
            >
                <div className="nav-auth-container">
                    <img src={logo} alt="Logo" className="nav-logo" />
                    <div id='nav-routing'>
                        <Link className={`nav-routinglink ${location.pathname === '/' ? 'active-link' : ''}`} to="/">Home</Link>
                        <Link className={`nav-routinglink ${basepath === '/productsell' ? 'active-link' : ''}`} to="/productsell/0">Plant collection</Link>
                        <Link className={`nav-routinglink ${location.pathname === '/contactus' ? 'active-link' : ''}`} to="/contactus">Contact Us</Link>
                    </div>
                    <div id='nav-auth'>
                        <div id='adjust-suggestion'>
                            <div className="nav-search-container">
                                <input type="text" value={searchValue} className="nav-search-input" placeholder="Search.." onChange={handleInputChange} />
                                <button onClick={handelSearch} className="nav-search-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" id='nav-searchicon' width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </button>
                            </div>
                            {searchValue && (
                                <ul id='ui-suggestion'>
                                    {filteredSuggestions.map((item, index) => (
                                        <p key={index} onClick={() => setSearchValue(item)}>
                                            {item}
                                        </p>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="nav-sign-in-container">
                            {isVerified ? (
                                <img src={user} alt="User Profile" id='nav-user-ac' onClick={() => navigate('/user')} />
                            ) : (
                                <>
                                    <Link to="/register" className="nav-sign-in-btn">
                                        Sign in
                                    </Link>
                                    <Link to="/login" className="nav-sign-in-btn">
                                        Log in
                                    </Link>
                                </>
                            )}
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" id='nav-cart' onClick={() => setCartOpen(true)}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </div>
                    <AddCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                </div>
            </motion.div>

        </>
    );
};

export default Navbar
