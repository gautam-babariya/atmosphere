import React from 'react'
import './Productpage.css'
import Productdet from '../../Components/Productdet/Productdet'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Randompro from '../../Components/Randompro/Randompro'

function Productpage() {
  return (
    <div id='product-page'>
      <Navbar />
      <Productdet />
      <Randompro />
      <Footer />
    </div>
  )
}

export default Productpage
