import React, { useEffect, useState } from 'react'
import './Sellingpage.css'
import Navbar from '../../Components/Navbar/Navbar'
import Heroimg from '../../Components/Heroimg/Heroimg';
import Category from '../../Components/Category/Category';
import Heroimg2 from '../../Components/Heroimg2/Heroimg2';
import Footer from '../../Components/Footer/Footer';
import Randompro from '../../Components/Randompro/Randompro';
import Loader from '../../Subcomponents/Loader/Loader';


function Sellingpage() {
  const [isLoggedIn, setIsLoggedIn] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate a loading process
    const timer = setTimeout(() => {
      setLoading(false);

    }, 200);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {loading ? <Loader name="Welcome to Atmosphere" /> :
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
      }
    </div>
  )
}

export default Sellingpage
