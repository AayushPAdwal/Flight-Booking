// server/models/Flight.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  airline: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  time: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Flight', FlightSchema);