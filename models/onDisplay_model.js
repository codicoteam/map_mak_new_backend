const mongoose = require("mongoose");

const OnDisplaySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Title is mandatory
    },
    description: {
      type: String,
      required: true, // Description is mandatory
    },
    image: {
      type: String,
      required: false, // Image is optional
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("OnDisplay", OnDisplaySchema);
