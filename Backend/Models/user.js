const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dpurl: { type: String, required: true }, 
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
