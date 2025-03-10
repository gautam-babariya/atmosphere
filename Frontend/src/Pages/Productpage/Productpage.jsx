import React from 'react'
import './Productpage.css'
import Productdet from '../../Components/Productdet/Productdet'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

function Productpage() {
  return (
    <div id='product-page'>
      <Navbar />
      <Productdet />
      <Footer />
    </div>
  )
}

export default Productpage
