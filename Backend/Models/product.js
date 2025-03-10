const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: {
        type: [String], // Array of strings (image URLs)
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && value.length <= 3; // Allow 1 to 3 images
            },
            message: "You must provide between 1 and 3 images",
        },
    },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
