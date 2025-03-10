const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const { Cashfree } = require('cashfree-pg');


Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const hash = crypto.createHash("sha256");
    hash.update(uniqueId);
    return hash.digest("hex").substring(0, 12);
}

router.get("/", async (req, res) => {
    try {
        let request = {
            "order_amount": 1.00,
            "order_currency": "INR",
            "order_id": await generateOrderId(),
            "customer_details": {
                "customer_id": "plivecreation",
                "customer_phone": "9999999999",
                "customer_name": "Customer Name",
                "customer_email": "demo@gmail.com"
            },
        }
        Cashfree.PGCreateOrder("2023-08-01", request).then(responce => {
            console.log(responce.data);
            res.status(200).json(responce.data);

        }).catch(err => {
            console.log(err.responce.data.message);

        })
    }
    catch (err) {
        console.log(err);
    }
});

router.post("/verify", async (req, res) => {
    try {
        let { orderId } = req.body;
        Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response) => {
            res.json(response.data);
        }).catch((err) => {
            console.log(err);
        } 
        )
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;
