import React, { useState } from 'react'
import './Sellingpage.css'
import Navbar from '../../Components/Navbar/Navbar'
import Heroimg from '../../Components/Heroimg/Heroimg';
import Category from '../../Components/Category/Category';
import Heroimg2 from '../../Components/Heroimg2/Heroimg2';
import Footer from '../../Components/Footer/Footer';
import Randompro from '../../Components/Randompro/Randompro';

function Sellingpage() {
  const [isLoggedIn, setIsLoggedIn] = useState(1);
  return (
    <div id='selling-page'>
      <Navbar Login={isLoggedIn} />
      <div id='selling-page-content'>
        <Heroimg />
        <Category />
        <Randompro />
        <Heroimg2 />
        <Randompro />
      </div>
      <Footer />
    </div>
  )
}

export default Sellingpage
