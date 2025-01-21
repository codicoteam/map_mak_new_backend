const mongoose = require("mongoose");

const BoughtGoodsSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const QuotationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    expectedDeposit: {
      type: Number,
      required: false,
    },
    customerNumber: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    rowMaterials: {
      type: String,
      required: false,
    },
    customerName: {
      type: String,
      required: true,
    },
    showQuotation: {
      type: String,
      required: false,
    },
    doYouHaveMaterials: {
      type: String,
      required: false,
    },
    expectedBudget: {
      type: String,
      required: false,
    },
    wantedFurniture: [BoughtGoodsSchema],
    termsAndConditions: {
      type: String,
      required: false,
    },
    dateNow: {
      type: String,
      default: () => new Date().toISOString().split("T")[0], // Default to current date
    },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

module.exports = mongoose.model("Quotation", QuotationSchema);
