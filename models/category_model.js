const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the CategoryModel schema
const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  categoryImagePath: {
    type: String,
    required: true
  },
  showCategory: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create and export the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
