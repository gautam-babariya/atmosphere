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
import Privet from './Subcomponents/Privet/Privet';
import Contactpage from './Pages/Contactpage/Contactpage';
import Addproductpage from './Pages/Addproductpage/Addproductpage';
import Deleteprodpage from './Pages/Deleteprodpage/Deleteprodpage';
import Allorderspage from './Pages/Allorderspage/Allorderspage';
import PaymentSuccess from './Components/PaymentSuccess/PaymentSuccess'
import Maindashboard from './Pages/Maindashboard/Maindashboard';
import Adminlogin from './Components/Adminlogin/Adminlogin';
import Chatbot from './Components/Chatbot/Chatbot';

function App() {
  return (
    <>
      <Router>
        <Chatbot />
        <Routes>
          <Route path="/" element={<Sellingpage />} />
          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/productsell/:id" element={<Productsellpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/ordertrack" element={
            <Privet>
              <Ordertrackpage />
            </Privet>
          }
          />
          <Route path="/user" element={
            <Privet>
              <Userpage />
            </Privet>}
          />
          <Route path="/payment-success" element={
            <Privet>
              <PaymentSuccess />
            </Privet>}
          />
          <Route path="/contactus" element={<Contactpage />} />
          
          <Route path="/admin-dashboard" element={<Adminpage />} />
          <Route path="/addproduct" element={<Addproductpage />} />
          <Route path="/deleteproduct" element={<Deleteprodpage />} />
          <Route path="/allorders" element={<Allorderspage />} />
          <Route path="/dashboard" element={<Maindashboard />} />
          <Route path="/login-admin" element={<Adminlogin />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
