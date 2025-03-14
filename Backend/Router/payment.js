const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const { Cashfree } = require('cashfree-pg');
const axios = require('axios');
require('dotenv').config();
const Payment = require("../Models/payment");
const mongoose = require("mongoose");

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const hash = crypto.createHash("sha256");
    hash.update(uniqueId);
    return hash.digest("hex").substring(0, 12);
}

router.post("/", async (req, res) => {
    const { order_amount, customer_id, customer_name, customer_email } = req.body;

    try {
        const request = {
            "order_amount": order_amount,
            "order_currency": "INR",
            "order_id": await generateOrderId(),
            "customer_details": {
                "customer_id": customer_id,
                "customer_phone": "9999999999",
                "customer_name": customer_name,
                "customer_email": customer_email
            },
        };

        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        
        res.status(200).json(response.data);

    } catch (err) {
        console.error("Order Creation Error:", err);
        res.status(500).json({ error: "Order creation failed" });
    }
});

router.post("/verify", async (req, res) => {
    try {
        const { orderId,paymentId } = req.body;
        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
        const paymentStatus = response.data[0]?.payment_status;
        if (paymentStatus === "SUCCESS") {
            console.log("✅ Payment successfully verified");
            const updatedPayment = await Payment.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(paymentId) },            // Find payment by orderId
                { status: "Completed" },        // Update status to "Completed"
                { new: true }                   // Return updated document
            );

            if (!updatedPayment) {
                console.log("❗ Payment record not found in database.");
                return res.status(404).json({ error: "Payment record not found" });
            }
            console.log("✅ Payment status updated in database:", updatedPayment);
            res.json({ success: true, orderStatus: "PAID" });
        } else {
            console.log("❌ Payment verification failed or pending.");
            res.json({ success: false });
        }
    } catch (error) {
        console.error("Error verifying payment:", error.response?.data || error.message);
        res.status(500).json({ error: "Verification failed" });
    }
});


module.exports = router;
