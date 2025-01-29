const express = require("express");
const CustomerCentreService = require("../services/customer_Center_service");
const router = express.Router();

const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

// Create a new customer
router.post("/", async (req, res) => {
  const response = await CustomerCentreService.createCustomer(req.body);
  handleResponse(res, response);
});

// Get all customers with pagination
router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const response = await CustomerCentreService.getAllCustomer(parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Get customers by email
router.get("/search/email", async (req, res) => {
  const { customerEmail } = req.query;
  const response = await CustomerCentreService.getByCustomerEmail(customerEmail);
  handleResponse(res, response);
});

// Delete a single customer by ID
router.delete("/:id", async (req, res) => {
  const response = await CustomerCentreService.deleteCustomer(req.params.id);
  handleResponse(res, response);
});

// Delete multiple customers by IDs
router.delete("/", async (req, res) => {
  const response = await CustomerCentreService.deleteCustomerByIds(req.body.customerIds);
  handleResponse(res, response);
});

module.exports = router;
