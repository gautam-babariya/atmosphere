const express = require('express');
const Contact = require('../Models/contact'); // Import the Contact model

const router = express.Router();

// POST Route to Save Contact Data
router.post('/', async (req, res) => {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newContact = new Contact({ firstName, lastName, email, phone, subject, message });
        await newContact.save();

        res.status(201).json({ success: true, message: "Contact message saved successfully." });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
