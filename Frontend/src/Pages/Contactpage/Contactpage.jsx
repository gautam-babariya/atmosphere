import React from 'react'
import './Contactpage.css'
import Contact from '../../Components/Contact/Contact'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

function Contactpage() {
  return (
    <div id='contactpage-div'>
      <Navbar />
      <Contact />
      <Footer />
    </div>
  )
}

export default Contactpage
