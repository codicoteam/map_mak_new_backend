const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      default: () => Math.random().toString(36).substring(2, 8).toUpperCase(), // Generate a random alphanumeric string
    },
    products: [
      {
        type: mongoose.Schema.Types.Mixed, // This can be replaced with a specific schema reference if `ProductsModel` has its own schema
        required: false,
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
    PostalCode: {
      type: String,
      required: false,
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
    mapLongitudes: {
      type: String,
      required: false,
    },
    mapLatitudes: {
      type: String,
      required: false,
    },
    comment: {
      type: String,
      required: false,
    },
    dateNow: {
      type: String,
      default: () => new Date().toISOString().split("T")[0], // Set default as the current date in YYYY-MM-DD format
    },
    orderTime: {
      type: String,
      default: () => new Date().toISOString().split("T")[1], // Set default as the current time
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Order", OrderSchema);
