const express = require("express");
const PaymentService = require("../services/make_payment_service");  // Adjust to your service file path
const router = express.Router();

// Helper function to handle service responses
const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

// Route to create a payment
router.post("/", async (req, res) => {
  const response = await PaymentService.createPayment(req.body);
  handleResponse(res, response);
});

// Route to get all payments (with pagination)
router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const response = await PaymentService.getAllPayments(parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Route to get payments by customer email (with pagination)
router.get("/customer/:customerEmail", async (req, res) => {
  const { customerEmail } = req.params;
  const { page, size } = req.query;
  const response = await PaymentService.getPaymentsByCustomerEmail(customerEmail, parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Route to get a payment by its poll URL and update its status
router.put("/update-by-poll-url", async (req, res) => {
  const { pollUrl } = req.body;
  const response = await PaymentService.findPaymentByPollUrlAndUpdate(pollUrl);
  handleResponse(res, response);
});

// Route to edit an existing payment
router.put("/:id", async (req, res) => {
  const response = await PaymentService.editPayment(req.params.id, req.body);
  handleResponse(res, response);
});

// Route to delete a payment by its ID
router.delete("/:id", async (req, res) => {
  const response = await PaymentService.deletePayment(req.params.id);
  handleResponse(res, response);
});

module.exports = router;
