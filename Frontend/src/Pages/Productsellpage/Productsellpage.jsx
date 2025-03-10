import React from 'react'
import './Productsellpage.css'
import Cards from '../../Components/Cards/Cards'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { useParams } from 'react-router-dom';


function Productsellpage() {
  const  id = useParams(); // Extract the 'id' from the URL

  return (
    <div id='Productsell-connainer'>
      <Navbar />
      <Cards name={id}/>
      <Footer />
    </div>
  )
}

export default Productsellpage
