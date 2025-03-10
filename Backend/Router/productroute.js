const express = require("express");
const router = express.Router();
const Product = require("../Models/product");

// Create a new product
router.post("/add", async (req, res) => {
    try {
        const { name, description, price, category, images } = req.body;

        // Validation: Ensure all required fields are present
        if (!name || !description || !price || !category || !images || images.length < 1) {
            return res.status(400).json({ message: "All fields are required and must include at least one image." });
        }

        // Create a new product
        const product = new Product({
            name,
            description,
            price,
            category,
            images,
        });

        // Save to database
        await product.save();

        res.status(201).json({ message: "Product created successfully", product });

    } catch (error) {
        console.error("Error storing product:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update product by ID
router.put("/:id", async (req, res) => {
    try {
        const { name, description, price, category, images } = req.body;

        // Validate product ID
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Validate images (max 3)
        if (images && (images.length < 1 || images.length > 3)) {
            return res.status(400).json({ message: "You must provide between 1 and 3 images" });
        }

        // Update product fields (only update if fields are provided)
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;
        if (images) product.images = images;

        await product.save();
        res.json({ message: "Product updated successfully", product });

    } catch (error) {
        console.error("Update product error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// delete product by ID
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        // Check if product exists
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete the product
        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
});

module.exports = router;
