const mongoose = require("mongoose");

// Define the schema for AppUser
const appUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roleName: {
        type: String,
        required: true,
    },
    userBiography: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    showUser: {
        type: Boolean,
        default: true,
    },
    authenticateUser: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER", "MANAGER"], // Add roles as needed
        required: true,
    },
});


// Export the model
module.exports = mongoose.model("AppUser", appUserSchema);