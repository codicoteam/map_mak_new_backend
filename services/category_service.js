const Category = require("../models/category_model");
const mongoose = require("mongoose");

const CategoryService = {
  async editCategory(id, categoryData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid category ID" };
    }
    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, { new: true });
    if (!updatedCategory) {
      return { status: 404, message: "Category not found" };
    }
    return { status: 200, data: updatedCategory };
  },

  async deleteCategory(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid category ID" };
    }
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return { status: 404, message: "Category not found" };
    }
    return { status: 200, message: "Category deleted successfully" };
  },

  async deleteCategoriesByIds(categoryIds) {
    const result = await Category.deleteMany({ _id: { $in: categoryIds } });
    if (result.deletedCount === 0) {
      return { status: 404, message: "No categories found to delete" };
    }
    return { status: 200, message: "Categories deleted successfully" };
  },

  async createCategory(categoryData) {
    const newCategory = new Category(categoryData);
    const savedCategory = await newCategory.save();
    return { status: 201, data: savedCategory };
  },

  async getAllCategories(page = 1, size = 10) {
    const skip = (page - 1) * size;
    const categories = await Category.find().skip(skip).limit(size);
    const total = await Category.countDocuments();
    return { status: 200, data: { categories, total, page, size } };
  },

  async getOneCategory(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid category ID" };
    }
    const category = await Category.findById(id);
    if (!category) {
      return { status: 404, message: "Category not found" };
    }
    return { status: 200, data: category };
  },
};

module.exports = CategoryService;
