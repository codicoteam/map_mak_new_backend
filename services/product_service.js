const Product = require("../models/products_model");
const mongoose = require("mongoose");

const ProductService = {
  async editProduct(id, productData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid product ID" };
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
    if (!updatedProduct) {
      return { status: 404, message: "Product not found" };
    }
    return { status: 200, data: updatedProduct };
  },

  async deleteProductByIds(productIds) {
    const result = await Product.deleteMany({ _id: { $in: productIds } });
    if (result.deletedCount === 0) {
      return { status: 404, message: "No products found to delete" };
    }
    return { status: 200, message: "Products deleted successfully" };
  },

  async deleteProduct(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid product ID" };
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return { status: 404, message: "Product not found" };
    }
    return { status: 200, message: "Product deleted successfully" };
  },

  async createProduct(productData) {
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    return { status: 201, data: savedProduct };
  },

  async getAllProduct(page = 1, size = 10) {
    const skip = (page - 1) * size;
    const products = await Product.find().skip(skip).limit(size);
    const total = await Product.countDocuments();
    return { status: 200, data: { products, total, page, size } };
  },

  async getOneProduct(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid product ID" };
    }
    const product = await Product.findById(id);
    if (!product) {
      return { status: 404, message: "Product not found" };
    }
    return { status: 200, data: product };
  },

  async searchCategory(categoryName, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const products = await Product.find({ "productCategories.name": categoryName }).skip(skip).limit(size);
    const total = await Product.countDocuments({ "productCategories.name": categoryName });
    if (!products.length) {
      return { status: 404, message: "No products found in this category" };
    }
    return { status: 200, data: { products, total, page, size } };
  },

  async searchColor(color, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const products = await Product.find({ colors: color }).skip(skip).limit(size);
    const total = await Product.countDocuments({ colors: color });
    if (!products.length) {
      return { status: 404, message: "No products found with this color" };
    }
    return { status: 200, data: { products, total, page, size } };
  },

  async searchType(type, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const products = await Product.find({ "productAttributes.type": type }).skip(skip).limit(size);
    const total = await Product.countDocuments({ "productAttributes.type": type });
    if (!products.length) {
      return { status: 404, message: "No products found of this type" };
    }
    return { status: 200, data: { products, total, page, size } };
  },

  async rangeProduct(minPrice, maxPrice, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const products = await Product.find({ productPrice: { $gte: minPrice, $lte: maxPrice } }).skip(skip).limit(size);
    const total = await Product.countDocuments({ productPrice: { $gte: minPrice, $lte: maxPrice } });
    if (!products.length) {
      return { status: 404, message: "No products found in this price range" };
    }
    return { status: 200, data: { products, total, page, size } };
  },

  async searchByFeature(feature, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const products = await Product.find({ "productAttributes.feature": feature }).skip(skip).limit(size);
    const total = await Product.countDocuments({ "productAttributes.feature": feature });
    if (!products.length) {
      return { status: 404, message: "No products found with this feature" };
    }
    return { status: 200, data: { products, total, page, size } };
  },

  async rangeDiscount(minDiscount, maxDiscount, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const products = await Product.find({ productDiscount: { $gte: minDiscount, $lte: maxDiscount } }).skip(skip).limit(size);
    const total = await Product.countDocuments({ productDiscount: { $gte: minDiscount, $lte: maxDiscount } });
    if (!products.length) {
      return { status: 404, message: "No products found in this discount range" };
    }
    return { status: 200, data: { products, total, page, size } };
  },

  async getAllProductByName(productName, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const products = await Product.find({ productName: { $regex: productName, $options: "i" } }).skip(skip).limit(size);
    const total = await Product.countDocuments({ productName: { $regex: productName, $options: "i" } });
    if (!products.length) {
      return { status: 404, message: "No products found matching this name" };
    }
    return { status: 200, data: { products, total, page, size } };
  },
};

module.exports = ProductService;
