const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      default: () => Math.random().toString(36).substring(2, 8).toUpperCase(), 
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
        productName:{
          type: String,
          required: false,
        },
        productPrice:{
          type: String,
          required: false,
        },
        productImages:[{
          type: String,
          required: false,
        }]
      },
    ],
    orderTotal: {
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
    customerLocation: {
      type: String,
      required: true,
    },
    orderTotalMoney: {
      type: Number,
      required: false,
    },
    showOrder: {
      type: Boolean,
      default: true,
    },
    booleanOrder: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: false,
    },
    dateNow: {
      type: String,
      default: () => new Date().toISOString().split("T")[0], 
    },
    orderTime: {
      type: String,
      default: () => new Date().toISOString().split("T")[1], 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
