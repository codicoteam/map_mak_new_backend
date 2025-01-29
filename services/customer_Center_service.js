const CustomerCentre = require("../models/customer_center_model");
const mongoose = require("mongoose");

const CustomerCentreService = {
  async createCustomer(customerData) {
    const newCustomer = new CustomerCentre(customerData);
    const savedCustomer = await newCustomer.save();
    return { status: 201, data: savedCustomer };
  },

  async getByCustomerEmail(customerEmail) {
    const customers = await CustomerCentre.find({ customerEmail });
    if (!customers.length) {
      return { status: 404, message: "No customers found with this email" };
    }
    return { status: 200, data: customers };
  },

  async getAllCustomer(page = 1, size = 10) {
    const skip = (page - 1) * size;
    const customers = await CustomerCentre.find().skip(skip).limit(size);
    const total = await CustomerCentre.countDocuments();
    return { status: 200, data: { customers, total, page, size } };
  },

  async deleteCustomerByIds(customerIds) {
    const result = await CustomerCentre.deleteMany({ _id: { $in: customerIds } });
    if (result.deletedCount === 0) {
      return { status: 404, message: "No customers found to delete" };
    }
    return { status: 200, message: "Customers deleted successfully" };
  },

  async deleteCustomer(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid customer ID" };
    }
    const deletedCustomer = await CustomerCentre.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return { status: 404, message: "Customer not found" };
    }
    return { status: 200, message: "Customer deleted successfully" };
  },
};

module.exports = CustomerCentreService;
