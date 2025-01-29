const MakePayment = require("../models/Makepayment model/make_payment_model");  // Adjust to your model path
const mongoose = require("mongoose");

const PaymentService = {
  async createPayment(paymentData) {
    const newPayment = new MakePayment(paymentData);
    try {
      const savedPayment = await newPayment.save();
      return { status: 201, data: savedPayment };
    } catch (err) {
      return { status: 400, message: "Error creating payment", error: err.message };
    }
  },

  async editPayment(id, paymentData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid payment ID" };
    }

    try {
      const updatedPayment = await MakePayment.findByIdAndUpdate(id, paymentData, { new: true });
      if (!updatedPayment) {
        return { status: 404, message: "Payment not found" };
      }
      return { status: 200, data: updatedPayment };
    } catch (err) {
      return { status: 400, message: "Error editing payment", error: err.message };
    }
  },

  async deletePayment(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid payment ID" };
    }

    try {
      const deletedPayment = await MakePayment.findByIdAndDelete(id);
      if (!deletedPayment) {
        return { status: 404, message: "Payment not found" };
      }
      return { status: 200, message: "Payment deleted successfully" };
    } catch (err) {
      return { status: 400, message: "Error deleting payment", error: err.message };
    }
  },

  async getAllPayments(page = 1, size = 10) {
    const skip = (page - 1) * size;
    try {
      const payments = await MakePayment.find().skip(skip).limit(size);
      const total = await MakePayment.countDocuments();
      return { status: 200, data: { payments, total, page, size } };
    } catch (err) {
      return { status: 400, message: "Error fetching payments", error: err.message };
    }
  },

  async getPaymentsByCustomerEmail(customerEmail, page = 1, size = 10) {
    if (!customerEmail) {
      return { status: 400, message: "Customer email is required" };
    }

    const skip = (page - 1) * size;
    try {
      const payments = await MakePayment.find({ customerEmail }).skip(skip).limit(size);
      const total = await MakePayment.countDocuments({ customerEmail });
      if (payments.length === 0) {
        return { status: 404, message: "No payments found for this email" };
      }
      return { status: 200, data: { payments, total, page, size } };
    } catch (err) {
      return { status: 400, message: "Error fetching payments", error: err.message };
    }
  },

  async findPaymentByPollUrlAndUpdate(pollUrl) {
    try {
      const payment = await MakePayment.findOne({ pollUrl });
      if (!payment) {
        return { status: 404, message: "Payment not found with the provided poll URL" };
      }
      payment.isPaid = true;
      await payment.save();
      return { status: 200, data: payment };
    } catch (err) {
      return { status: 400, message: "Error updating payment", error: err.message };
    }
  },
};

module.exports = PaymentService;
