const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
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
    isHiringEnable: {
      type: Boolean,
      default: false,
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
    content: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0], // Default to current date
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
    colors: [
      {
        type: String, // List of color strings
        required: false,
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
    reviews: [
      {
        showReview: {
          type: Boolean,
          default: true,
        },
        username: {
          type: String,
          required: true,
        },
        reviewReason: {
          type: String,
          required: false,
        },
        color: {
          type: String,
          required: false,
        },
        ratings: {
          type: Number,
          required: false,
        },
        dateNow: {
          type: String,
          default: () => new Date().toISOString().split("T")[0], // Default to current date
        },
      },
    ],
    productGuarantee: {
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

module.exports = mongoose.model("Product", ProductsSchema);
