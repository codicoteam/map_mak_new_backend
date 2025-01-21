const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Optionally, you can use UUID for unique hiringId generation

const HiringSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductsModel", // Reference to the ProductsModel collection
        required: true,
      },
    ],
    hiringTotal: {
      type: String,
      required: true,
    },
    hiringId: {
      type: String,
      default: () => uuidv4().slice(0, 6), // Generates a 6-character alphanumeric string
      unique: true,
    },
    nameOfEvent: {
      type: String,
      required: true,
    },
    dateOfEvent: {
      type: String,
      required: true,
    },
    customerPhoneNumber: {
      type: String,
      required: true,
    },
    dateNow: {
      type: String,
      default: () => new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    },
    endOfEventTime: {
      type: String,
      required: true,
    },
    venueOfEvent: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      required: true,
    },
    hiringDescription: {
      type: String,
      required: true,
    },
    nameOfRecipient: {
      type: String,
      required: true,
    },
    emailOfRecipient: {
      type: String,
      required: true,
    },
    passportNumber: {
      type: String,
      default: null,
    },
    hiringTotalMoney: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    homeAddress: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    LocationOfMaterials: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location", // Reference to the Product model
      required: false, // Products are optional
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed"], // Example status values
      default: "Pending",
    },
    booleanStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Hiring", HiringSchema);
