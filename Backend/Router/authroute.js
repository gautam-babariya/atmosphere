const express = require("express");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Product = require("../Models/product");
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, address, email, password, dpurl } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Create new user
    const newUser = new User({ name, dpurl, address, email, password });

    // Save to DB
    await newUser.save();

    // Generate Token
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id },
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: "Invalid user" });

    // Check password
    if (user.password !== password) {
      return res.status(200).json({ message: "Invalid password" });
    }

    // Generate Token
    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      user: { id: user._id },
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// VERIFY TOKEN
router.post("/verify", async (req, res) => {
  try {
    const { mytoken, user_id } = req.body;

    if (!mytoken || !user_id) {
      return res.status(200).json({ message: "Token and userId are required" });
    }

    // Verify JWT token
    const decoded = jwt.verify(mytoken, process.env.JWT_SECRET);

    if (!decoded || decoded.userId !== user_id) {
      return res.status(200).json({ message: "Invalid or expired token" });
    }

    // Check if user exists in database
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    res.json({ message: "Token and user ID are valid", userId: user._id });

  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

router.post("/userdata", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
})
router.post("/updateme", async (req, res) => {
  try {
    const { userId, name, address, email, password } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user", details: error.message });
  }
})
router.post("/cart/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const itemExists = user.cart.some(item => item.product.toString() === productId);
    if (!itemExists) {
      user.cart.push({ product: productId });
    }

    await user.save();
    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/cart/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    await user.save();

    res.status(200).json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/cart/get", async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId).populate({
    path: 'cart.product',
    model: 'Product'    
  });
  res.status(200).json({ cart: user });
})

module.exports = router;
