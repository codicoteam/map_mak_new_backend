
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the CustomerCentreModels schema
const customerCentreSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  showCustomerCentre: {
    type: Boolean,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerNumber: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the CustomerCentre model
const CustomerCentre = mongoose.model('CustomerCentre', customerCentreSchema);

module.exports = CustomerCentre;
