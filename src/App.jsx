import { useState } from 'react'
import './App.css'
import '../public/globel.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './Pages/Landingpage/Landingpage';
import Sellingpage from './Pages/Sellingpage/Sellingpage';
import Productpage from './Pages/Productpage/Productpage';
import Productsellpage from './Pages/Productsellpage/Productsellpage';
import Addcartpage from './Pages/Addcartpage/Addcartpage';
import Registerpage from './Pages/Registerpage/Registerpage';
import Loginpage from './Pages/Loginpage/Loginpage';
import Ordertrackpage from './Pages/Ordertrackpage/Ordertrackpage';
import Userpage from './Pages/Userpage/Userpage';
import Adminpage from './Pages/Adminpage/Adminpage';

function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/selling" element={<Sellingpage />} />
          <Route path="/:id" element={<Productpage />} />
          <Route path="/productsell" element={<Productsellpage />} />
          <Route path="/addcart" element={<Addcartpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/ordertrack" element={<Ordertrackpage />}
          />
          <Route path="/user" element={<Userpage />} />
          <Route path="/admin" element={<Adminpage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
