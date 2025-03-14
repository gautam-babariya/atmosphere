import React from 'react'
import './Adminpage.css'
import Admindash from '../../Components/Admindash/Admindash'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Adminpage() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminId = localStorage.getItem('admin-id');
    const adminPassword = localStorage.getItem('admin-password');

    if (!adminId || !adminPassword) {
      navigate('/login-admin'); 
    }
    else if(adminId=="admin" & adminPassword=="admin@123"){
      console.log("admin login");
    }
    else{
      navigate('/login-admin');
    }
  }, [navigate]);
  return (
    <div id='adminpage-div'>
      <Navbar />
      <Admindash />
      <Footer />
    </div>
  )
}

export default Adminpage
