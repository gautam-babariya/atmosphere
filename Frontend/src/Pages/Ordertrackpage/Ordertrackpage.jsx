import React from 'react'
import './Ordertrackpage.css'
import Ordertrack from '../../Components/Ordertrack/Ordertrack'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

function Ordertrackpage() {
  return (
    <div id='ordertrack-div'>
      <Navbar />
      <Ordertrack />
      <Footer />
    </div>
  )
}

export default Ordertrackpage
