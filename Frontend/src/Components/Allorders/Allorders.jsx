import React, { useEffect, useState } from 'react'
import './Allorders.css'
import logo from '../Navbar/storage/logo.svg'
import axios from 'axios';
const backendurl = import.meta.env.VITE_BACKEND_URL;

const OrderItem = ({ data }) => {
    const markOrderAsDelivered = async (orderId) => {
        try {
            const response = await axios.post(`${backendurl}/api/order/delivered`,{
                orderId: orderId
            });
            if (response.status === 200) {
                alert('Order marked as delivered successfully!');
            }
        } catch (error) {
            console.error('Error marking order as delivered:', error);
            alert(error.response?.data?.error || 'Failed to update order status');
        }
    };
    return (
        <div className="order-item">
            {data.items.map((item) => (
                <div key={item._id} className="order-track-item">
                    <div id='ordertrack-imgdiv'>
                        <img src={item.product.images[0] || logo} alt={item.product.name || 'Product image'} />
                    </div>

                    <div id='ordertrack-carddiv'>
                        <div className="item-details">
                            <div id='ordertrack-itemname'>
                                <h1>{item.product.name || 'Unnamed Product'}
                                    <p id='order-id'>Category: {item.product.category}</p>
                                </h1>
                                <h2>Qty: {item.quantity}</h2>
                            </div>
                            <h2>${item.product.price}</h2>
                        </div>

                        <hr />

                    </div>
                </div>
            ))}
            <div className="status-container">
                <p id='order-id'>Order ID: {data._id}</p>
                <p id='order-id'>User name: {data.user.name}</p>
                <p id='order-id'>User email: {data.user.email}</p>
                <p id='order-id'>Status: {data.status}</p>
                <p id='order-id'>Total Amount: ${data.totalAmount}</p>
                <p id='order-id'>Created At: {new Date(data.createdAt).toLocaleString()}</p>
                <div className="status-bar">
                    <div className={`status-progress ${data.status.toLowerCase()}`}></div>
                </div>

                <div className="status-labels">
                    <span>Out for Delivery</span>
                    <span>Delivered</span>
                </div>
            </div>
            <button id='check-order' className={`order-complete ${data.status.toLowerCase()}`} onClick={()=>{markOrderAsDelivered(data._id)}}   disabled={data.status.toLowerCase() === 'delivered'}>{data.status.toLowerCase() === 'pending' ? 'Complete' : 'Completed'}</button>
        </div>
    );
};


function Allorders() {
    const [alldata, setAlldata] = useState([])
    useEffect(() => {
        axios.get(`${backendurl}/api/order/alldata`)
            .then(response => {
                let all = response.data
                setAlldata(all.filter(order => order.payment.status === "Completed"))
            })
            .catch(error => {
                console.error('There was an error fetching the orders!', error);
            });
    }, []);

    return (
        <div id='allorder-div'>
            <header className="user-header">
                <h1>Welcome, Admin</h1>
            </header>
            {alldata.map((item, index) => (
                <OrderItem key={index} data={item} />
            ))}
        </div>
    )
}

export default Allorders
