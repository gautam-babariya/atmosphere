import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');
    const paymentId = searchParams.get('payment_id'); // Added this line
    const [status, setStatus] = useState('Verifying...');
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const res = await axios.post(`${backendurl}/payment/verify`, { orderId:orderId,
                    paymentId:paymentId
                 });
                if (res.data.success) {
                    setStatus("✅ Payment Successful! Your order is confirmed.");
                } else {
                    setStatus("❌ Payment Failed or Pending. Please contact support.");
                }
            } catch (error) {
                setStatus("❌ Error verifying payment. Please try again.");
                console.error('Verification error:', error);
            }
        };

        if (orderId) verifyPayment();
    }, [orderId]);

    return (
        <div className="container">
            <h1>Payment Status</h1>
            <p>{status}</p>
            <a href="/">Go back to Home</a>
        </div>
    );
};

export default PaymentSuccess;
