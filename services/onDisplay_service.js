const mongoose = require("mongoose");
const OnDisplay = require("../models/onDisplay_model");

const OnDisplayService = {
  async editOnDisplay(id, onDisplayData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid OnDisplay ID" };
    }
    const updatedOnDisplay = await OnDisplay.findByIdAndUpdate(id, onDisplayData, { new: true });
    if (!updatedOnDisplay) {
      return { status: 404, message: "OnDisplay not found" };
    }
    return { status: 200, data: updatedOnDisplay };
  },

  async deleteOnDisplay(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid OnDisplay ID" };
    }
    const deletedOnDisplay = await OnDisplay.findByIdAndDelete(id);
    if (!deletedOnDisplay) {
      return { status: 404, message: "OnDisplay not found" };
    }
    return { status: 200, message: "OnDisplay deleted successfully" };
  },

  async createOnDisplay(onDisplayData) {
    const newOnDisplay = new OnDisplay(onDisplayData);
    const savedOnDisplay = await newOnDisplay.save();
    return { status: 201, data: savedOnDisplay };
  },

  async getAllOnDisplay(page = 1, size = 10) {
    const skip = (page - 1) * size;
    const onDisplayItems = await OnDisplay.find().skip(skip).limit(size);
    const total = await OnDisplay.countDocuments();
    return { status: 200, data: { onDisplayItems, total, page, size } };
  },

  async getOneOnDisplay(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid OnDisplay ID" };
    }
    const onDisplayItem = await OnDisplay.findById(id);
    if (!onDisplayItem) {
      return { status: 404, message: "OnDisplay not found" };
    }
    return { status: 200, data: onDisplayItem };
  },
};

module.exports = OnDisplayService;
