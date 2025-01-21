const mongoose = require("mongoose");

const InviteUserSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    invitedEmail: {
      type: String,
      required: true,
    },
    invitingEmail: {
      type: String,
      required: true,
    },
    invitingUserName: {
      type: String,
      required: true,
    },
    showInvite: {
      type: Boolean,
      default: true,
    },
    booleanInvite: {
      type: Boolean,
      default: false,
    },
    dateNow: {
      type: String,
      default: () => new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    },
    invitedTime: {
      type: String,
      default: () => new Date().toLocaleTimeString(), // Current time
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("InviteUser", InviteUserSchema);
