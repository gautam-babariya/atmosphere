const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
    method: { type: String, enum: ["UPI", "Cash on Delivery"], required: true }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
