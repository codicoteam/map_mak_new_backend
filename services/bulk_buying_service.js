const BulkBuying = require("../models/bulk_buying_model");
const mongoose = require("mongoose");

const BulkBuyingService = {
  async editBulkBuying(id, bulkBuyingData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid BulkBuying ID" };
    }
    const updatedBulkBuying = await BulkBuying.findByIdAndUpdate(id, bulkBuyingData, { new: true });
    if (!updatedBulkBuying) {
      return { status: 404, message: "BulkBuying not found" };
    }
    return { status: 200, data: updatedBulkBuying };
  },

  async deleteBulkBuyingByIds(bulkBuyingIds) {
    const result = await BulkBuying.deleteMany({ _id: { $in: bulkBuyingIds } });
    if (result.deletedCount === 0) {
      return { status: 404, message: "No BulkBuying records found to delete" };
    }
    return { status: 200, message: "BulkBuying records deleted successfully" };
  },

  async deleteBulkBuying(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid BulkBuying ID" };
    }
    const deletedBulkBuying = await BulkBuying.findByIdAndDelete(id);
    if (!deletedBulkBuying) {
      return { status: 404, message: "BulkBuying not found" };
    }
    return { status: 200, message: "BulkBuying deleted successfully" };
  },

  async createBulkBuying(bulkBuyingData) {
    const newBulkBuying = new BulkBuying(bulkBuyingData);
    const savedBulkBuying = await newBulkBuying.save();
    return { status: 201, data: savedBulkBuying };
  },



  async searchColor(color, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const bulkBuyings = await BulkBuying.find({ colors: color }).skip(skip).limit(size);
    const total = await BulkBuying.countDocuments({ colors: color });
    if (!bulkBuyings.length) {
      return { status: 404, message: "No BulkBuying records found with this color" };
    }
    return { status: 200, data: { bulkBuyings, total, page, size } };
  },
  async rangePrice(minPrice, maxPrice, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const bulkBuyings = await BulkBuying.find({ bulkBuyingPrice: { $gte: minPrice, $lte: maxPrice } }).skip(skip).limit(size);
    const total = await BulkBuying.countDocuments({ bulkBuyingPrice: { $gte: minPrice, $lte: maxPrice } });
    if (!bulkBuyings.length) {
      return { status: 404, message: "No BulkBuying records found in this price range" };
    }
    return { status: 200, data: { bulkBuyings, total, page, size } };
  },

  async searchByFeature(feature, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const bulkBuyings = await BulkBuying.find({ "bulkBuyingAttributes.feature": feature }).skip(skip).limit(size);
    const total = await BulkBuying.countDocuments({ "bulkBuyingAttributes.feature": feature });
    if (!bulkBuyings.length) {
      return { status: 404, message: "No BulkBuying records found with this feature" };
    }
    return { status: 200, data: { bulkBuyings, total, page, size } };
  },

  async rangeDiscount(minDiscount, maxDiscount, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const bulkBuyings = await BulkBuying.find({ bulkBuyingDiscount: { $gte: minDiscount, $lte: maxDiscount } }).skip(skip).limit(size);
    const total = await BulkBuying.countDocuments({ bulkBuyingDiscount: { $gte: minDiscount, $lte: maxDiscount } });
    if (!bulkBuyings.length) {
      return { status: 404, message: "No BulkBuying records found in this discount range" };
    }
    return { status: 200, data: { bulkBuyings, total, page, size } };
  },



  async getAllBulkBuying(page = 1, size = 10) {
    const skip = (page - 1) * size;
    const bulkBuyings = await BulkBuying.find()
      .populate("Location") // Populate Location reference
      .populate("bulkBuyingCategories") // Populate bulkBuyingCategories reference
      .skip(skip)
      .limit(size);
    const total = await BulkBuying.countDocuments();
    return { status: 200, data: { bulkBuyings, total, page, size } };
  },

  async getOneBulkBuying(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid BulkBuying ID" };
    }
    const bulkBuying = await BulkBuying.findById(id)
      .populate("Location") // Populate Location reference
      .populate("bulkBuyingCategories"); // Populate bulkBuyingCategories reference
    if (!bulkBuying) {
      return { status: 404, message: "BulkBuying not found" };
    }
    return { status: 200, data: bulkBuying };
  },

  async searchCategory(categoryName, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const bulkBuyings = await BulkBuying.find({ "bulkBuyingCategories.name": categoryName })
      .populate("Location") // Populate Location reference
      .populate("bulkBuyingCategories") // Populate bulkBuyingCategories reference
      .skip(skip)
      .limit(size);
    const total = await BulkBuying.countDocuments({ "bulkBuyingCategories.name": categoryName });
    if (!bulkBuyings.length) {
      return { status: 404, message: "No BulkBuying records found in this category" };
    }
    return { status: 200, data: { bulkBuyings, total, page, size } };
  },

  async searchType(type, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const bulkBuyings = await BulkBuying.find({ "bulkBuyingAttributes.type": type })
      .populate("Location") // Populate Location reference
      .populate("bulkBuyingCategories") // Populate bulkBuyingCategories reference
      .skip(skip)
      .limit(size);
    const total = await BulkBuying.countDocuments({ "bulkBuyingAttributes.type": type });
    if (!bulkBuyings.length) {
      return { status: 404, message: "No BulkBuying records found of this type" };
    }
    return { status: 200, data: { bulkBuyings, total, page, size } };
  },


};

module.exports = BulkBuyingService;
