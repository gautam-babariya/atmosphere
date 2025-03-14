import React from 'react'
import './Maindashboard.css'
import Dashboard2 from '../../Components/Dashboard2/Dashboard2'
import Dashboard from '../../Components/Dashboard/Dashboard'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

function Maindashboard() {
  return (
    <div id='maindash-div'>
      <Navbar />
      <Dashboard />
      <Dashboard2 />
      <Footer />
    </div>
  )
}

export default Maindashboard
