const express = require('express');
const connectDB = require("./Config/db");
const authRoutes = require("./Router/authroute");
const productRoutes = require("./Router/productroute");
const orderRoutes = require("./Router/orderroute");
const Payment = require("./Router/payment");
const cors = require('cors');
const crypto = require('crypto');
const{Cashfree} = require('cashfree-pg');


const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON requests

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); 
app.use("/api/order", orderRoutes);
app.use("/payment", Payment);

app.get('/', (req, res) => {
    res.send('Server is available');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});