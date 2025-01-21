const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Location schema
const locationSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Location model
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
