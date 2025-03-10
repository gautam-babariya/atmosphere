import { useState } from 'react'
import './App.css'
import '../public/globel.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sellingpage from './Pages/Sellingpage/Sellingpage';
import Productpage from './Pages/Productpage/Productpage';
import Productsellpage from './Pages/Productsellpage/Productsellpage';
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
          <Route path="/" element={<Sellingpage />} />
          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/productsell/:id" element={<Productsellpage />} />
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
