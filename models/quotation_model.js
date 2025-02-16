const mongoose = require("mongoose");
const quotationSchema = new mongoose.Schema({
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
    required: true,
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
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  showQuotation: {
    type: String,
    required: true,
  },
  doYouHaveMaterials: {
    type: String,
    required: true,
  },
  expectedBudget: {
    type: String,
    required: true,
  },
  wantedFurniture: [
    {
      // Define the structure of BoughtGoods if necessary, based on the original model.
      // Assuming it's a list of items bought, you can modify according to your requirements.
      itemId: {
        type: String,
        required: true,
      },

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
  ], // List of bought goods
  termsAndConditions: {
    type: String,
    required: true,
  },
  dateNow: {
    type: String,
    default: () => new Date().toISOString().split("T")[0], // Default to current date
  },
});

// Export the model
module.exports = mongoose.model("Quotation", quotationSchema);
