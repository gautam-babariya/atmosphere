const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Delivered"], default: "Pending" },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
