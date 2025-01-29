const mongoose = require("mongoose");

// Define the schema for QuotationModel
const boughtGoodsSchema = new mongoose.Schema({
    // Define the structure of BoughtGoods if necessary, based on the original model.
    // Assuming it's a list of items bought, you can modify according to your requirements.
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Define the QuotationModel schema
const quotationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expectedDeposit: {
        type: Number,
        required: true
    },
    customerNumber: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    rowMaterials: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    showQuotation: {
        type: String,
        required: true
    },
    doYouHaveMaterials: {
        type: String,
        required: true
    },
    expectedBudget: {
        type: String,
        required: true
    },
    wantedFurniture: [boughtGoodsSchema], // List of bought goods
    termsAndConditions: {
        type: String,
        required: true
    },
    dateNow: {
        type: String,
        default: () => new Date().toISOString().split('T')[0] // Default to current date
    }
});

// Export the model
module.exports = mongoose.model("Quotation", quotationSchema);
