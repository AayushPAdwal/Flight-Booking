// server/routes/flights.js
const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight'); // Import the model

// @route   GET /api/flights
// @desc    Search for flights based on 'from' and 'to' locations
router.get('/', async (req, res) => {
  try {
    const { from, to } = req.query; // Get 'from' and 'to' from the URL query

    if (!from || !to) {
      return res.status(400).json({ msg: "Please provide 'from' and 'to' locations." });
    }

    const flights = await Flight.find({ from, to });

    res.json(flights); // Send the found flights back as a JSON response

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;