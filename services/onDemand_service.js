const OnDemand = require("../models/onDemand_model"); // Assuming the OnDemand model is stored here
const mongoose = require("mongoose");

const OnDemandService = {
  // Edit an existing OnDemand product by ID
  async editProduct(id, onDemandData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid OnDemand ID" };
    }
    const updatedProduct = await OnDemand.findByIdAndUpdate(id, onDemandData, { new: true })
      .populate("productLocation")
      .populate("productCategories");
    if (!updatedProduct) {
      return { status: 404, message: "OnDemand not found" };
    }
    return { status: 200, data: updatedProduct };
  },

  // Delete a single OnDemand product by ID
  async deleteProduct(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid OnDemand ID" };
    }
    const deletedProduct = await OnDemand.findByIdAndDelete(id);
    if (!deletedProduct) {
      return { status: 404, message: "OnDemand product not found" };
    }
    return { status: 200, message: "OnDemand product deleted successfully" };
  },

  // Create a new OnDemand product
  async createProduct(onDemandData) {
    const newOnDemandProduct = new OnDemand(onDemandData);
    const savedProduct = await newOnDemandProduct.save();
    return { status: 201, data: savedProduct };
  },

  // Get all OnDemand products with pagination and populate productLocation & productCategories
  async getAllProduct(page = 1, size = 10) {
    const skip = (page - 1) * size;
    const products = await OnDemand.find()
      .populate("productLocation")
      .populate("productCategories")
      .skip(skip)
      .limit(size);
    const total = await OnDemand.countDocuments();
    return { status: 200, data: { products, total, page, size } };
  },

  // Get a single OnDemand product by ID and populate productLocation & productCategories
  async getOneProduct(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid OnDemand ID" };
    }
    const product = await OnDemand.findById(id)
      .populate("productLocation")
      .populate("productCategories");
    if (!product) {
      return { status: 404, message: "OnDemand product not found" };
    }
    return { status: 200, data: product };
  },
};

module.exports = OnDemandService;
