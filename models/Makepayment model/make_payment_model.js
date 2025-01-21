const mongoose = require("mongoose");

const BoughtGoodsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false, // Prevents Mongoose from creating an `_id` for each subdocument
  }
);

const MakePaymentSchema = new mongoose.Schema(
  {
    pollUrl: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentTotal: {
      type: String,
      required: true,
    },
    paymentTotalNum: {
      type: Number,
      required: true,
    },
    furnitureBought: [
      {
        type: BoughtGoodsSchema, // Embedding BoughtGoods schema
        required: true,
      },
    ],
    Goods: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhoneNumber: {
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
    showPayment: {
      type: Boolean,
      default: true,
    },
    booleanPayment: {
      type: Boolean,
      default: false,
    },
    dateNow: {
      type: String,
      default: () => new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    },
    currentTime: {
      type: String,
      default: () => new Date().toLocaleTimeString(), // Current time
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("MakePayment", MakePaymentSchema);
