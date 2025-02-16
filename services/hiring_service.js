const Hiring = require("../models/hiring_model"); // Import the Hiring model
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const HiringService = {
  async hireProducts(hiringData) {
    try {
      const productNames = hiringData.products
        .map((product) => product.productName)
        .join(", ");

      const newHiring = new Hiring(hiringData);
      const savedHiring = await newHiring.save();

      // Configure nodemailer for sending emails
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mapmaksoftwaresolutions@gmail.com", // Replace with your email
          pass: "drphypohowmrpspg", // Replace with your email password or app password
        },
      });

      // Email to customer
      const customerMailOptions = {
        from: "mapmaksoftwaresolutions@gmail.com",
        to: hiringData.customerEmail,
        subject: "Booking Confirmation - Successful Order Placement",
        text: `We are delighted to inform you that your order has been successfully placed. Thank you for choosing our services!

Order Details:
Order Number: ${savedHiring.hiringId}
Order Date: ${savedHiring.dateNow}
Product(s) Ordered: [${productNames}]
Total Amount: ${savedHiring.hiringTotal}

Our team is processing your order. Within the next 24 hours, one of our representatives will reach out to confirm your payment method.

Thank you for choosing MapMak Furniture. We look forward to serving you!

Best regards,
MapMak Furniture`,
      };

      await transporter.sendMail(customerMailOptions);

      // Email to owner
      const ownerMailOptions = {
        from: "mapmaksoftwaresolutions@gmail.com",
        to: hiringData.customerEmail, // Replace with owner's email
        subject: "New Order Notification",
        text: `A hiring order has been made by a customer.

Booking Details:
Booking Number: ${savedHiring.hiringId}
Booking Date: ${savedHiring.dateNow}
Customer Email: ${hiringData.customerEmail}
Product(s) Booked: ${productNames}
Hiring Description: ${hiringData.hiringDescription}
Total Amount: ${hiringData.hiringTotal}

Please check your Dashboard on the MapMak Furniture App for more details.`,
      };

      await transporter.sendMail(ownerMailOptions);

      return {
        status: 200,
        message: "Hiring saved successfully",
        data: savedHiring,
      };
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Order saving failed", error };
    }
  },

  async getOneHiringById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid hiring ID" };
    }
    const hiring = await Hiring.findById(id).populate("products");
    if (!hiring) {
      return { status: 404, message: "Hiring not found" };
    }
    return { status: 200, data: hiring };
  },

  async getHiringByCustomerEmail(email) {
    const hiring = await Hiring.find({ customerEmail: email });
    if (!hiring.length) {
      return { status: 404, message: "No hiring records found for this email" };
    }
    return { status: 200, data: hiring };
  },

  async editHiringById(id, hiringData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid hiring ID" };
    }
    const updatedHiring = await Hiring.findByIdAndUpdate(id, hiringData, {
      new: true,
    });
    if (!updatedHiring) {
      return { status: 404, message: "Hiring not found" };
    }
    return { status: 200, data: updatedHiring };
  },

  async deleteHiringById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid hiring ID" };
    }
    const deletedHiring = await Hiring.findByIdAndDelete(id);
    if (!deletedHiring) {
      return { status: 404, message: "Hiring not found" };
    }
    return { status: 200, message: "Hiring deleted successfully" };
  },

  async getHiringByOrderId(orderId) {
    const hiring = await Hiring.findOne({ hiringId: orderId }).populate(
      "products"
    );
    if (!hiring) {
      return { status: 404, message: "Hiring not found" };
    }
    return { status: 200, data: hiring };
  },
};

module.exports = HiringService;
