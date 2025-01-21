const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the main PackageModels schema with all fields inlined
const packageModelsSchema = new Schema(
  {
    packageSalesPrice: {
      type: String,
      required: true,
    },
    packageRecommendation: {
      type: String,
      required: true,
    },
    packagePurchasable: {
      type: Boolean,
      required: true,
    },
    showPackage: {
      type: Boolean,
      required: true,
    },
    Location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location", // Reference to the Product model
      required: false, // Products are optional
    },
    packageQuantity: {
      type: Number,
      required: true,
    },
    packagePrice: {
      type: Number,
      required: true,
    },
    packageDiscount: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    dateNow: {
      type: String,
      required: true,
      default: () => new Date().toISOString(), // Default to the current date
    },
    regularPrice: {
      type: String,
      required: true,
    },
    packageName: {
      type: String,
      required: true,
    },

    packageDescription: {
      type: String,
      required: true,
    },
    packageLikes: {
      type: Number,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    initialOrder: {
      type: Number,
      default: 1,
    },
    rowMaterials: {
      type: [String],
      required: true,
    },
    explainRowMaterials: {
      type: String,
      required: true,
    },
    packageCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // Reference to the Product model
        required: false, // Products are optional
      },
    ],
    colors: {
      type: [String],
      required: true,
    },
    images: [
      {
        imageUrl: {
          type: String,
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productPrice: {
          type: String,
          required: true,
        },
        wholesaleEmail: {
          type: String,
          required: true,
        },
        wholesaleName: {
          type: String,
          required: true,
        },
        wholesalePhone: {
          type: String,
          required: true,
        },
      },
    ],
    packageAttributes: [
      {
        capacity: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        feature: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: [
      {
        showReview: {
          type: Boolean,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        reviewReason: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        ratings: {
          type: Number,
          required: true,
        },
        dateNow: {
          type: String,
          required: true,
          default: () => new Date().toISOString(), // Default to the current date
        },
      },
    ],
    packageWarranty: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Create and export the PackageModels model
const PackageModels = mongoose.model("Package", packageModelsSchema);

module.exports = PackageModels;
