const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema(
  {
    productSalesPrice: {
      type: String,
      required: false,
    },
    productPurchasable: {
      type: Boolean,
      default: true,
    },
    showProduct: {
      type: Boolean,
      default: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDiscount: {
      type: Number,
      required: false,
    },
    setState: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0], // Default to the current date
    },
    productLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location", // Reference to the Product model
      required: false, // Products are optional
    },
    regularPrice: {
      type: String,
      required: false,
    },
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productLikes: {
      type: Number,
      default: 0,
    },
    initialOrder: {
      type: Number,
      default: 0,
    },
    productCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // Reference to the Product model
        required: false, // Products are optional
      },
    ],
    images: [
      {
        imageUrl: {
          type: String,
          required: false,
        },
      },
    ],
    productAttributes: [
      {
        capacity: {
          type: String,
          required: false,
        },
        color: {
          type: String,
          required: false,
        },
        type: {
          type: String,
          required: false,
        },
        feature: {
          type: String,
          required: false,
        },
      },
    ],
    productGuarantee: {
      type: String,
      required: false,
    },
    advertisingImage: {
      type: String,
      required: false,
    },
    wholesalersName: {
      type: String,
      required: false,
    },
    wholesalerProductPrice: {
      type: String,
      required: false,
    },
    wholesalersEmail: {
      type: String,
      required: false,
    },
    wholesalersPhone: {
      type: String,
      required: false,
    },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

module.exports = mongoose.model("Promotion", PromotionSchema);
