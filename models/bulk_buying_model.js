const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the BulkBuying schema
const bulkBuyingSchema = new Schema(
  {
    bulkSalesPrice: { type: String, required: true },
    bulkRecommendation: { type: String, required: true },
    bulkPurchasable: { type: Boolean, required: true },
    showBulkBuying: { type: Boolean, required: true },
    totalPricePerQuantity: { type: String, required: true },
    totalGoods: { type: Number, required: true },
    totalCostPrice: { type: String, required: true },
    totalCostPrices: { type: Number, required: true },
    packageQuantity: { type: Number, required: true },
    bulkBuyingPrice: { type: Number, required: true },
    bulkBuyingDiscount: { type: Number, required: true },
    content: { type: String, required: true },
    status: { type: String, required: true },
    dateNow: { type: String, default: () => new Date().toISOString() }, // Defaults to current date
    regularPrice: { type: String, required: true },
    bulkBuyingName: { type: String, required: true },
    bulkBuyingDescription: { type: String, required: true },
    bulkBuyingLikes: { type: Number, required: true },
    tip: { type: String, required: true },
    ratings: { type: Number, required: true },
    initialOrder: { type: Number, default: 1 }, // Default value for initialOrder
    wholesaleEmail: { type: String, required: true },
    wholesaleName: { type: String, required: true },
    wholesalePhone: { type: String, required: true },
    rowMaterials: { type: [String], required: true },
    Location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location", // Reference to the Product model
      required: false, // Products are optional
    },
    explainRowMaterials: { type: String, required: true },
    bulkBuyingCategories: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Category", // Reference to the Product model
              required: false, // Products are optional
            }
    ],
    colors: { type: [String], required: true },
    images: [
      {
        imageUrl: { type: String, required: true },
      },
    ],
    bulkBuyingAttributes: [
      {
        capacity: { type: String, required: true },
        color: { type: String, required: true },
        type: { type: String, required: true },
        feature: { type: String, required: true },
      },
    ],
    reviews: [
      {
        showReview: { type: Boolean, required: true },
        username: { type: String, required: true },
        reviewReason: { type: String, required: true },
        color: { type: String, required: true },
        ratings: { type: Number, required: true },
        dateNow: { type: String, default: () => new Date().toISOString() }, // Defaults to current date
      },
    ],
    bulkBuyingWarranty: { type: String, required: true },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Create and export the BulkBuying model
const BulkBuying = mongoose.model("BulkBuying", bulkBuyingSchema);

module.exports = BulkBuying;
