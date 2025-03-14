import React, { useEffect, useState } from 'react';
import './Userdash.css';
import logo from '../Navbar/storage/logo.svg'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Userdash = () => {
    const [name,setName] = useState('');
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [address,setAddress] = useState('');
    const [password,setPassword] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [Userdata, setUserdata] = useState("");
    const labellist = ["Full name", "Email", "Address", "Password", "Language"]
    const datakey = ["name", "email", "address", "password"]

    const handleInputChange = (e,index) => {
        if (index==0){
            setName(e.target.value);
        }
        else if (index==1){
            setEmail(e.target.value);
        }
        else if (index==2){
            setAddress(e.target.value);
        }
        else{
            setPassword(e.target.value);
        }
    };
    const toggleReadOnly = () => {
        setIsReadOnly(!isReadOnly);
    };
    const saveme = async () => {
        try {
            const updatedData = {
                userId: localStorage.getItem('user_id'),
                name: name,
                email: email,
                address:address,
                password:password
            };
            
            const backendurl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.post(`${backendurl}/api/auth/updateme`, updatedData);
            if (response.data.message=="User updated successfully"){
                window.location.reload();
            }
            else{
                alert("Error during update user data")
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update profile.";
            console.error("Error updating user:", errorMessage);
            alert(errorMessage);
        }
    }
    useEffect(() => {
        try {
            const userData = {
                userId: localStorage.getItem('user_id')
            };
            const backendurl = import.meta.env.VITE_BACKEND_URL;
            axios.post(`${backendurl}/api/auth/userdata`, userData)
                .then((Response) => {
                    setUserdata(Response.data.user)
                    setName(Response.data.user.name)
                    setAddress(Response.data.user.address)
                    setEmail(Response.data.user.email)
                    setPassword(Response.data.user.password)
                })
        } catch {
            console.log("error in user data");
        }
    }, []);
    return (
        <div className="user-dashboard">
            <header className="user-header">
                <h1>Welcome, {Userdata ? (
                    Userdata.name.split(' ')[0]
                ) : (
                    "Username"
                )}</h1>
                <p>{currentDate.toLocaleString()}</p>
            </header>
            <div className="user-info">
                <div className="profile-picture">
                    <div id='imgtitle-div'>
                        <img src={logo} alt="Profile" />
                        <div id='name-adjust'>
                            <h2>{Userdata.name}</h2>
                            <p>{Userdata.email}</p>
                        </div>
                    </div>
                    <Link onClick={toggleReadOnly} className="nav-sign-in-btn">
                        Edit
                    </Link>
                </div>
                <div className="user-details">
                    {[...Array(4)].map((_, index) => (
                        <div className="form-group">
                            <label>{labellist[index]}</label>
                            <input
                                className='user-data'
                                placeholder={Userdata[datakey[index]]}
                                onChange={(e) => {handleInputChange(e,index)}}
                                readOnly={isReadOnly}
                                style={{
                                    outline: 'none',
                                    cursor: isReadOnly ? 'default' : 'text',
                                    border: isReadOnly ? '1px solid rgb(172, 172, 172)' : '2px solid rgb(46,46,46'
                                }}
                            />
                        </div>
                    ))}
                    <div className="form-group">
                        <label>Language</label>
                        <input
                            className='user-data'
                            placeholder="English"
                            readOnly
                        />
                    </div>
                </div>
            </div>
            <div id='div-saveuser'>
                <Link onClick={saveme} id='edit-userdata' className="user-footer-btn nav-sign-in-btn" style={{
                    display: isReadOnly ? 'none' : 'flex'
                }}>
                    Save
                </Link>
            </div>
            <hr></hr>
            <div className="userdash-footer">
                <Link to="/ordertrack" className="user-footer-btn nav-sign-in-btn">
                    Orders
                </Link>
                <Link to="/dashboard" className="user-footer-btn nav-sign-in-btn">
                    Dashboard
                </Link>
            </div>
        </div>
    );
}

export default Userdash;