import React, { useState } from 'react'
import './Sellingpage.css'
import Navbar from '../../Components/Navbar/Navbar'
import Heroimg from '../../Components/Heroimg/Heroimg';
import Category from '../../Components/Category/Category';
import Heroimg2 from '../../Components/Heroimg2/Heroimg2';

function Sellingpage() {
  const [isLoggedIn, setIsLoggedIn] = useState(0); 
  return (

    <div id='selling-page'>
       <Navbar Login={isLoggedIn}/> 
        <Heroimg />
        <Category />
        <Heroimg2 />
    </div>
  )
}

export default Sellingpage
