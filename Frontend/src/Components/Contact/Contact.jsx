import React, { useState } from 'react';
import './Contact.css';
import call from './storage/call.svg'
import discord from './storage/discord.svg'
import email from './storage/email.svg'
import insta from './storage/insta.svg'
import location from './storage/location.svg'
const backendurl = import.meta.env.VITE_BACKEND_URL;
import axios from 'axios';



const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    // Handle form data changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendurl}/api/contact`, formData);

            if (response.status === 201) {
                alert('✅ Message sent successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                alert(`❗ Error: ${response.data.error || 'Failed to send message.'}`);
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                alert(`❗ Error: ${error.response.data.error || 'Failed to send message.'}`);
            } else if (error.request) {
                // Request was made but no response received
                alert('❗ Network error. Please try again later.');
            } else {
                // Something else went wrong
                alert('❗ An unexpected error occurred.');
            }
            console.error('Error:', error);
        }
    };
    return (
        <div className="contact-container">
            <div className="contact-info">
                <h2>Contact Information</h2>
                <div className="contact-details">
                    <p><img src={call} alt='phone:' /> +1012 3456 789</p>
                    <p><img src={email} alt='email:' /> demo@gmail.com</p>
                    <p><img src={location} alt='address:' /> 132 Dartmouth Street Boston, Massachusetts 02156 United States</p>
                </div>
                <div className="social-links">
                    <img src={insta} alt='instagram' />
                    <img src={discord} alt='discord' />
                </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Subject?</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Support</option>
                    <option value="feedback">Feedback</option>
                </select>
                <textarea
                    name="message"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
                <button id='contact-applybt' className="nav-sign-in-btn">
                    Send
                </button>
            </form>
        </div>
    );
}

export default Contact;