import React from 'react'
import './Userpage.css'
import Userdash from '../../Components/Userdash/Userdash'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

function Userpage() {
  return (
    <div id='userpage-div'>
      <Navbar />
      <Userdash />
      <Footer />
    </div>
  )
}

export default Userpage
