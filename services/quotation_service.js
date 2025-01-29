const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Quotation = require("../models/quotation_model"); // Path to your Quotation model

const QuotationService = {
  async createQuotation(quotationData) {
    try {
      // Create a new quotation document
      const newQuotation = new Quotation(quotationData);

      // Save the quotation to the database
      const savedQuotation = await newQuotation.save();

      // Prepare the email message for the customer
      const termsAndConditions = quotationData.termsAndConditions.join("\n");

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "your-email@gmail.com", // Replace with your email
          pass: "your-email-password", // Replace with your email password
        },
      });

      const mailOptionsCustomer = {
        from: "your-email@gmail.com", // Replace with your email
        to: quotationData.customerEmail,
        subject: "Quotation Confirmation - Successful Quotation Placement",
        text: `Dear ${quotationData.customerName},\n\nThank you for your interest in our products and services. We are pleased to provide you with the following quotation:\n\nQuotation Title: ${quotationData.title}\nMessage: ${quotationData.message}\nQuantity: ${quotationData.quantity}\nExpected Deposit: ${quotationData.expectedDeposit}\nCustomer Number: ${quotationData.customerNumber}\nCustomer Address: ${quotationData.customerAddress}\nExpected Budget: ${quotationData.expectedBudget}\n\nTerms and Conditions:\n${termsAndConditions}\n\nBest regards,\nYour Company Name`,
      };

      // Send email to the customer
      await transporter.sendMail(mailOptionsCustomer);

      // Email to the owner about the new quotation
      const mailOptionsOwner = {
        from: "your-email@gmail.com", // Replace with your email
        to: "owner-email@gmail.com", // Replace with owner's email
        subject: "New Quotation Notification",
        text: `A new quotation has been created by a customer.\n\nQuotation Details:\nQuotation Title: ${quotationData.title}\nMessage: ${quotationData.message}\nCustomer Name: ${quotationData.customerName}\nCustomer Email: ${quotationData.customerEmail}\nQuantity: ${quotationData.quantity}\nExpected Deposit: ${quotationData.expectedDeposit}\nExpected Budget: ${quotationData.expectedBudget}\n\nTerms and Conditions:\n${termsAndConditions}`,
      };

      // Send email to the owner
      await transporter.sendMail(mailOptionsOwner);

      return { status: 201, data: savedQuotation };
    } catch (error) {
      console.error("Error creating quotation:", error);
      return { status: 500, message: "Failed to create and send quotation email" };
    }
  },

  async editQuotation(id, quotationData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid quotation ID" };
    }

    try {
      const updatedQuotation = await Quotation.findByIdAndUpdate(id, quotationData, { new: true });

      if (!updatedQuotation) {
        return { status: 404, message: "Quotation not found" };
      }

      return { status: 200, data: updatedQuotation };
    } catch (error) {
      console.error("Error editing quotation:", error);
      return { status: 500, message: "Failed to edit quotation" };
    }
  },

  async deleteQuotation(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid quotation ID" };
    }

    try {
      const deletedQuotation = await Quotation.findByIdAndDelete(id);

      if (!deletedQuotation) {
        return { status: 404, message: "Quotation not found" };
      }

      return { status: 200, message: "Quotation deleted successfully" };
    } catch (error) {
      console.error("Error deleting quotation:", error);
      return { status: 500, message: "Failed to delete quotation" };
    }
  },

  async getAllQuotations(page = 1, size = 10) {
    const skip = (page - 1) * size;
    try {
      const quotations = await Quotation.find().skip(skip).limit(size);
      const total = await Quotation.countDocuments();

      return { status: 200, data: { quotations, total, page, size } };
    } catch (error) {
      console.error("Error fetching quotations:", error);
      return { status: 500, message: "Failed to fetch quotations" };
    }
  },

  async getOneQuotation(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid quotation ID" };
    }

    try {
      const quotation = await Quotation.findById(id);

      if (!quotation) {
        return { status: 404, message: "Quotation not found" };
      }

      return { status: 200, data: quotation };
    } catch (error) {
      console.error("Error fetching quotation:", error);
      return { status: 500, message: "Failed to fetch quotation" };
    }
  },
};

module.exports = QuotationService;
