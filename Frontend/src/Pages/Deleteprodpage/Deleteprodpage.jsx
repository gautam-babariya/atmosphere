import React, { useEffect } from 'react'
import './Deleteprodpage.css'
import Deleteproduct from '../../Components/Deleteproduct/Deleteproduct'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { useNavigate } from 'react-router-dom';


function Deleteprodpage() {
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
    <div id='deletepropage-div'>
      <Navbar />
      <Deleteproduct />
      <Footer />
    </div>
  )
}

export default Deleteprodpage
