const mongoose = require("mongoose");
const InviteUser = require("../models/invite_user_model");
const nodemailer = require("nodemailer");


const InviteUserService = {
  async createInvite(inviteData) {
    try {
      // Save invite data to the database
      const newInvite = new InviteUser(inviteData);
      const savedInvite = await newInvite.save();

      const dotenv=require('dotenv').config();
      // Send email invitation
      const transporter = nodemailer.createTransport({
        service: "gmail", // or another email service
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your email password or app password
        },
      });

      const mailOptions = {
        to: inviteData.invitedEmail,
        subject: "Invitation to MapMak Furnitures",
        text: `Dear User,

This email has been sent to you by ${inviteData.invitingUserName}.
You have been invited to try MapMak Furnitures, a web-based system for furniture management. We believe that you will find it useful for your furniture-related tasks.

To get started, please visit the following link:
https://mapmak.co.zw

If you have any questions or need assistance, feel free to reach out to our support team.

Thank you for considering MapMak Furnitures!`,
      };

      await transporter.sendMail(mailOptions);

      return { status: 201, message: "Invitation sent successfully", data: savedInvite };
    } catch (error) {
      console.error("Error in creating invite:", error);
      return { status: 500, message: "Failed to send invitation", error: error.message };
    }
  },

  async getByInvitingEmail(invitingEmail) {
    try {
      const invites = await InviteUser.find({ invitingEmail });
      if (!invites.length) {
        return { status: 404, message: "No invites found for this email" };
      }
      return { status: 200, data: invites };
    } catch (error) {
      console.error("Error in retrieving invites:", error);
      return { status: 500, message: "Failed to retrieve invites", error: error.message };
    }
  },

  async getAllInvites(page = 1, size = 10) {
    try {
      const skip = (page - 1) * size;
      const invites = await InviteUser.find().skip(skip).limit(size);
      const total = await InviteUser.countDocuments();
      return { status: 200, data: { invites, total, page, size } };
    } catch (error) {
      console.error("Error in retrieving all invites:", error);
      return { status: 500, message: "Failed to retrieve all invites", error: error.message };
    }
  },

  async deleteManyByIds(inviteIds) {
    try {
      const result = await InviteUser.deleteMany({ _id: { $in: inviteIds } });
      if (result.deletedCount === 0) {
        return { status: 404, message: "No invites found to delete" };
      }
      return { status: 200, message: "Invites deleted successfully" };
    } catch (error) {
      console.error("Error in deleting invites:", error);
      return { status: 500, message: "Failed to delete invites", error: error.message };
    }
  },
};

module.exports = InviteUserService;

