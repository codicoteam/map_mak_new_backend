const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema(
  {
    wishListName: {
      type: String,
      required: true,
    },
    wishListId: {
      type: String,
      default: () => Math.random().toString(36).substr(2, 6).toUpperCase(), // Generates a 6-character alphanumeric ID
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          refPath: "products.productModel", // Dynamic reference
        },
        productModel: {
          type: String,
          required: true,
          enum: ["Product", "BulkBuying", "OnDemand"], // Allowed models
        },
        productName: {
          type: String,
          required: false,
        },
        productPrice: {
          type: String,
          required: false,
        },
        productImages: [
          {
            type: String,
            required: false,
          },
        ],
      },
    ],
    wishListTotal: {
      type: String,
      required: false,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhoneNumber: {
      type: String,
      required: true,
    },
    wishListTotalMoney: {
      type: Number,
      required: false,
    },
    showWishList: {
      type: Boolean,
      default: true,
    },
    booleanWishList: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      required: false,
    },
    comment: {
      type: String,
      required: false,
    },
    dateNow: {
      type: String,
      default: () => new Date().toISOString().split("T")[0], // Default to the current date
    },
    orderTime: {
      type: String,
      default: () => new Date().toISOString().split("T")[1], // Default to the current time
    },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

module.exports = mongoose.model("WishList", WishListSchema);
