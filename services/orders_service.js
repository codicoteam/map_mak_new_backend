const Order = require("../models/order_model");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const OrderService = {
  // Create an Order
  async createOrder(orderData) {
    try {
      const newOrder = new Order(orderData);
      const savedOrder = await newOrder.save();

      // Send email to the customer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mapmaksoftwaresolutions@gmail.com", // Replace with your email
          pass: "drphypohowmrpspg", // Replace with your email password or OAuth token
        },
      });

      // Email to customer
      const customerMessage = {
        from: "mapmaksoftwaresolutions@gmail.com",
        to: orderData.customerEmail,
        subject: "Order Confirmation - Successful Order Placement",
        text: `
          We are delighted to inform you that your order has been successfully placed. 
          
          Order Details:
          Order Number: ${orderData.orderId}
          Order Date: ${orderData.dateNow}
          Product(s) Ordered: ${orderData.products
            .map((product) => product.productName)
            .join(", ")}
          Total Amount: ${orderData.orderTotal}
          
          Our team is processing your order and will be in touch soon for further details.
        `,
      };

      await transporter.sendMail(customerMessage);

      // Email to owner
      const ownerMessage = {
        from: "mapmaksoftwaresolutions@gmail.com",
        to: orderData.customerEmail, // Replace with the owner's email
        subject: "New Order Notification",
        text: `
          A new order has been placed by a customer.

          Order Details:
          Order Number: ${orderData.orderId}
          Order Date: ${orderData.dateNow}
          Customer Email: ${orderData.customerEmail}
          Product(s) Ordered: ${orderData.products
            .map((product) => product.productName)
            .join(", ")}
          Total Amount: ${orderData.orderTotal}
          
          Please check your Dashboard for more details.
        `,
      };

      await transporter.sendMail(ownerMessage);

      return {
        status: 201,
        message: "Order created successfully",
        data: savedOrder,
      };
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Order creation failed" };
    }
  },

  // Get Order by Order ID
  async getOneOrderById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid order ID" };
    }
    const order = await Order.findById(id);
    if (!order) {
      return { status: 404, message: "Order not found" };
    }
    return { status: 200, data: order };
  },

  // Get Orders by Customer Email and populate products
  async getOrderByCustomerEmail(email) {
    const orders = await Order.find({ customerEmail: email }).populate(
      "products"
    );
    if (orders.length === 0) {
      return { status: 404, message: "No orders found for this email" };
    }
    return { status: 200, data: orders };
  },

  // Update Order by Order ID
  async editOrderById(id, updatedOrderData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid order ID" };
    }
    const updatedOrder = await Order.findByIdAndUpdate(id, updatedOrderData, {
      new: true,
    });
    if (!updatedOrder) {
      return { status: 404, message: "Order not found" };
    }
    return { status: 200, data: updatedOrder };
  },

  // Delete Order by Order ID
  async deleteOrder(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid order ID" };
    }
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return { status: 404, message: "Order not found" };
    }
    return { status: 200, message: "Order deleted successfully" };
  },
};

module.exports = OrderService;
