const mongoose = require("mongoose");

const OnDemandSchema = new mongoose.Schema(
  {
    productSalesPrice: {
      type: String,
      required: true,
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
      default: 0,
    },
    setState: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      default: () => new Date().toISOString(),
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
    productCategories: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category", // Refereance to the Product model
          required: false, // Products are optional
        },
      ],
      required: false,
    },
    images: {
      type: [
        {
          imageUrl: {
            type: String,
            required: true,
          },
        },
      ],
      required: false,
    },
    productAttributes: {
      type: [
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
      required: false,
    },
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
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("OnDemand", OnDemandSchema);
