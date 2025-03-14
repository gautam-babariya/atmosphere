import React, { useEffect, useState } from 'react';
import './Addcart.css';
import img from './storage/plantimg.svg'
import deletesvg from './storage/deletesvg.svg'
import axios from 'axios';
const backendurl = import.meta.env.VITE_BACKEND_URL;
const frontdurl = import.meta.env.VITE_FRONTEND_URL;
import { load } from '@cashfreepayments/cashfree-js';

const AddCart = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [Cartlist, setCartlist] = useState([]);
    const [Countlist, setCountlist] = useState([]);
    const [pricelist, setPricelist] = useState([]);
    const [total, setTotal] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0); // Key to trigger re-render
    let ordermongo = {};
    let cashfree;

    let insitializeSDK = async function () {
        cashfree = await load({
            mode: "sandbox",
        })
    }
    insitializeSDK()
    const [orderId, setOrderId] = useState("");

    const getSessionId = async () => {
        const tempRes = await axios.post(`${backendurl}/api/auth/userdata`, {
            userId: localStorage.getItem('user_id')
        });
        let paymentid;
        const orderdata = {
            "order_amount": total,
            "customer_id": localStorage.getItem('user_id'),
            "customer_name": tempRes.data.user.name,
            "customer_email": tempRes.data.user.email
        };
        try {
            ordermongo.user = localStorage.getItem('user_id');
            ordermongo.method = "UPI"
            await axios.post(`${backendurl}/api/auth/cart/get`, {
                userId: localStorage.getItem('user_id'),
            })
                .then(response => {
                    setCartlist(response.data.cart.cart);
                    response.data.cart.cart.forEach((product, index) => {
                        if (!Array.isArray(ordermongo.items)) {
                            ordermongo.items = [];
                        }
                        ordermongo.items.push({ product: product.product._id, quantity: Countlist[index] });
                    });
                })
                .catch(error => {
                    console.error('There was an error fetching the products!', error);
                });

            await axios.post(`${backendurl}/api/order/create`, ordermongo).then(responce => {
                console.log("order created");
                paymentid = responce.data.order.payment._id
            }).catch(error => {
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }

        try {
            let res = await axios.post(`${backendurl}/payment`, orderdata);
            return {sessionId: res.data.payment_session_id,
                orderIds: res.data.order_id,
            paymentid: paymentid};
        } catch (error) {
            console.error("Session ID Error:", error);
        }
    };

    const handelClick = async (e) => {
        e.preventDefault();
        try {
            let sesorderIds = await getSessionId();
            let sessionId = sesorderIds.sessionId
            let orderIds = sesorderIds.orderIds
            let paymentid = sesorderIds.paymentid
            
            let checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_self",
                returnUrl: `${frontdurl}/payment-success?order_id=${orderIds}&payment_id=${paymentid}`
            };
            await cashfree.checkout(checkoutOptions);
        } catch (error) {
            console.error("Error initiating payment:", error);
        }
    };

    const updatecount = (index1, newValue1) => {
        if (newValue1 < 1) {
            return;
        }
        const updatedItems = Countlist.map((item, index) => {
            if (index === index1) {
                return newValue1
            };
            return item; // Keep the rest unchanged
        });
        setCountlist(updatedItems);
    };

    useEffect(() => {
        const productData = {
            userId: localStorage.getItem('user_id'),
        };
        axios.post(`${backendurl}/api/auth/cart/get`, productData)
            .then(response => {
                setCartlist(response.data.cart.cart);
                response.data.cart.cart.forEach((product) => {
                    setCountlist((prevCountlist) => [...prevCountlist, 1]);
                    setPricelist((prevCountlist) => [...prevCountlist, product.product.price])
                });
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, [refreshKey]);
    useEffect(() => {
        const newTotal = pricelist.reduce((acc, price, i) => acc + price * Countlist[i], 0);
        setTotal(newTotal);
    }, [Countlist, pricelist]);

    const deletecart = (id) => {
        try {
            const productData = {
                userId: localStorage.getItem('user_id'),
                productId: id
            };
            const backendurl = import.meta.env.VITE_BACKEND_URL;
            axios.post(`${backendurl}/api/auth/cart/remove`, productData)
                .then((Response) => {
                    setRefreshKey((prevKey) => prevKey + 1);
                })
        } catch {
            console.log("Error during remove item");
        }
    }

    return (
        <div className="add-cart-popup">
            <div className="popup-content">
                <div id='scroll-adjust'>
                    <div className="popup-header">
                        <h2>MY CART</h2>
                        <button className="close-btn" onClick={onClose}>✖</button>
                    </div>
                    {Cartlist.map((product, index) => (
                        <div className="cart-item">
                            <img src={product.product.images[0]} alt="Calathea Orbifolia" className="cart-item-image" />
                            <div className="item-details">
                                <h3>Name: {product.product.name}</h3>
                                <p>Price: ₹{product.product.price}</p>
                                <div id='cart-adjustme'>
                                    <div className="quantity-controls">
                                        <button onClick={() => updatecount(index, Countlist[index] - 1)} id='cart-button1'>-</button>
                                        <span>{Countlist[index]}</span>
                                        <button onClick={() => updatecount(index, Countlist[index] + 1)} id='cart-button2'>+</button>
                                    </div>
                                    <img src={deletesvg} className="delete-btn" onClick={() => { deletecart(product.product._id) }} alt="Calathea Orbifolia" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="checkout">
                    <button onClick={handelClick} className="checkout-btn">CHECKOUT - ₹{total}</button>
                    <p>30 Day Happiness Guarantee</p>
                </div>
            </div>
        </div>
    );
};

export default AddCart;