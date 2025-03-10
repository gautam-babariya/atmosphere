import React, { useState } from 'react';
import './AddCart.css';
import img from './storage/plantimg.svg'
import deletesvg from './storage/deletesvg.svg'
import axios from 'axios';
const backendurl = import.meta.env.VITE_BACKEND_URL;
import { load } from '@cashfreepayments/cashfree-js';

const AddCart = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [countlist, setcountlist] = useState([1, 1, 1]);

    let cashfree;

    let insitializeSDK = async function () {
        cashfree = await load({
            mode: "sandbox",
        })
    }
    insitializeSDK()
    const [orderId, setOrderId] = useState("");
    const getSessionId = async () => {
        try {
            let res = await axios.get(`${backendurl}/payment`);

            if (res.data && res.data.payment_session_id) {
                console.log(res.data);
                setOrderId(res.data.order_id);
                return res.data.payment_session_id;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const verifyPayment = async (orderId) => {
        try {
            let res = await axios.post(`${backendurl}/payment/verify`, {
                orderId: orderId
            });

            if (res && res.data) {
                alert("payment veryfy")
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handelClick = async (e) => {
        e.preventDefault();
        try {
            let sessionId = await getSessionId();
            let checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_model",
            }
            cashfree.checkout(checkoutOptions).then((res) => {
                console.log("payment initiate");
                verifyPayment(orderId);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const updatecount = (index1, newValue1) => {
        if (newValue1<1){
            return;
        } 
        const updatedItems = countlist.map((item, index) => {
            if (index === index1) return newValue1;
            return item; // Keep the rest unchanged
        });
        setcountlist(updatedItems);        
    };

    return (
        <div className="add-cart-popup">
            <div className="popup-content">
                <div id='scroll-adjust'>
                    <div className="popup-header">
                        <h2>MY CART</h2>
                        <button className="close-btn" onClick={onClose}>✖</button>
                    </div>
                    {countlist.map((item, index) => (
                        <div className="cart-item">
                            <img src={img} alt="Calathea Orbifolia" className="cart-item-image" />
                            <div className="item-details">
                                <h3>Calathea Orbifolia</h3>
                                <p>$43.00</p>
                                <p>Small</p>
                                <div id='cart-adjustme'>
                                    <div className="quantity-controls">
                                        <button onClick={() => updatecount(index, item - 1)}id='cart-button1'>-</button>
                                        <span>{item}</span>
                                        <button onClick={() => updatecount(index, item + 1)} id='cart-button2'>+</button>
                                    </div>
                                    <img src={deletesvg} className="delete-btn" alt="Calathea Orbifolia" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="checkout">
                    <button onClick={handelClick} className="checkout-btn">CHECKOUT - $43.00</button>
                    <p>30 Day Happiness Guarantee</p>
                </div>
            </div>
        </div>
    );
};

export default AddCart;