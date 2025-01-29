const Promotion = require("../models/promotion_model");
const mongoose = require("mongoose");

const PromotionService = {
  async editPromotion(id, promotionData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid promotion ID" };
    }
    const updatedPromotion = await Promotion.findByIdAndUpdate(id, promotionData, { new: true });
    if (!updatedPromotion) {
      return { status: 404, message: "Promotion not found" };
    }
    return { status: 200, data: updatedPromotion };
  },

  async deletePromotion(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid promotion ID" };
    }
    const deletedPromotion = await Promotion.findByIdAndDelete(id);
    if (!deletedPromotion) {
      return { status: 404, message: "Promotion not found" };
    }
    return { status: 200, message: "Promotion deleted successfully" };
  },

  async deletePromotionsByIds(promotionIds) {
    const result = await Promotion.deleteMany({ _id: { $in: promotionIds } });
    if (result.deletedCount === 0) {
      return { status: 404, message: "No promotions found to delete" };
    }
    return { status: 200, message: "Promotions deleted successfully" };
  },

  async createPromotion(promotionData) {
    const newPromotion = new Promotion(promotionData);
    const savedPromotion = await newPromotion.save();
    return { status: 201, data: savedPromotion };
  },

  async getAllPromotions(page = 1, size = 10) {
    const skip = (page - 1) * size;
    const promotions = await Promotion.find().skip(skip).limit(size);
    const total = await Promotion.countDocuments();
    return { status: 200, data: { promotions, total, page, size } };
  },

  async getPromotionById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid promotion ID" };
    }
    const promotion = await Promotion.findById(id);
    if (!promotion) {
      return { status: 404, message: "Promotion not found" };
    }
    return { status: 200, data: promotion };
  },

  async searchPromotionByName(name, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const promotions = await Promotion.find({ productName: { $regex: name, $options: "i" } })
      .skip(skip)
      .limit(size);
    const total = await Promotion.countDocuments({ productName: { $regex: name, $options: "i" } });
    if (!promotions.length) {
      return { status: 404, message: "No promotions found with this name" };
    }
    return { status: 200, data: { promotions, total, page, size } };
  },

  async searchPromotionByCategory(categoryId, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const promotions = await Promotion.find({ productCategories: categoryId }).skip(skip).limit(size);
    const total = await Promotion.countDocuments({ productCategories: categoryId });
    if (!promotions.length) {
      return { status: 404, message: "No promotions found in this category" };
    }
    return { status: 200, data: { promotions, total, page, size } };
  },

  async filterPromotionsByPriceRange(minPrice, maxPrice, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const promotions = await Promotion.find({ productPrice: { $gte: minPrice, $lte: maxPrice } })
      .skip(skip)
      .limit(size);
    const total = await Promotion.countDocuments({ productPrice: { $gte: minPrice, $lte: maxPrice } });
    if (!promotions.length) {
      return { status: 404, message: "No promotions found in this price range" };
    }
    return { status: 200, data: { promotions, total, page, size } };
  },

  async filterPromotionsByDiscountRange(minDiscount, maxDiscount, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const promotions = await Promotion.find({ productDiscount: { $gte: minDiscount, $lte: maxDiscount } })
      .skip(skip)
      .limit(size);
    const total = await Promotion.countDocuments({ productDiscount: { $gte: minDiscount, $lte: maxDiscount } });
    if (!promotions.length) {
      return { status: 404, message: "No promotions found in this discount range" };
    }
    return { status: 200, data: { promotions, total, page, size } };
  },
};

module.exports = PromotionService;
