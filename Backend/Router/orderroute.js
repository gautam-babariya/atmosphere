const express = require("express");
const router = express.Router();
const Order = require("../Models/order");
const Product = require("../Models/product");
const User = require("../Models/user");
const Payment = require("../Models/payment");

router.post("/create", async (req, res) => {
  try {
    const { user, items, method } = req.body;

    // Validate user
    const existingUser = await User.findById(user);
    if (!existingUser) return res.status(404).json({ message: "User not found" });

    // Validate items
    if (!items || items.length === 0) return res.status(400).json({ message: "Order must contain at least one item" });

    let totalAmount = 0;
    let populatedItems = [];

    // Calculate total amount & validate products
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Product with ID ${item.product} not found` });

      totalAmount += product.price * item.quantity;
      populatedItems.push({ product, quantity: item.quantity });
    }

    // **Step 1: Create Order (Without Payment)**
    const newOrder = new Order({
      user,
      items,
      totalAmount,
      status: "Pending"
    });

    const savedOrder = await newOrder.save();

    // **Step 2: Create Payment linked to the Order**
    const newPayment = new Payment({
      order: savedOrder._id,
      user,
      amount: totalAmount,
      method,
      status: "Pending"
    });

    const savedPayment = await newPayment.save();

    // **Step 3: Update Order with Payment ID**
    savedOrder.payment = savedPayment._id;
    await savedOrder.save();

    // **Step 4: Push Order ID into User’s `orders` array**
    existingUser.orders.push(savedOrder._id);
    await existingUser.save();

    // Populate Order with User, Products & Payment details
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("user", "name email address") // Populate user details
      .populate("items.product", "name price category images") // Populate product details
      .populate("payment"); // Populate payment details

    res.status(201).json({ message: "Order placed successfully", order: populatedOrder });

  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { orderId, userId } = req.body; // Extract orderId and userId from request body

    // Validate request body
    if (!orderId || !userId) {
      return res.status(400).json({ message: "Order ID and User ID are required" });
    }

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order belongs to the given userId
    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized: You can only delete your own orders" });
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/alldata", async (req, res) => {
  try {

    // Find the order by ID
    const order = await Order.find()
      // .populate({
      //   path: 'user',
      //   select: 'name email' // Populate specific user fields
      // })
      // .populate({
      //   path: 'items.product',
      //   select: 'name price images' // Populate product details
      // });
      .populate('user', 'name email')             // Populate user details
      .populate({
        path: 'items.product',
        select: 'name price images'            // Populate product details
      })
      .populate('payment')                        // Populate full payment details
      .sort({ createdAt: -1 });


    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

router.post('/delivered', async (req, res) => {
  const { orderId } = req.body;

  try {
      const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { status: 'Delivered' },
          { new: true } // Returns the updated document
      );

      if (!updatedOrder) {
          return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ message: 'Order marked as delivered', order: updatedOrder });
  } catch (error) {
      res.status(500).json({ error: 'Failed to update order status', details: error.message });
  }
});


module.exports = router;
