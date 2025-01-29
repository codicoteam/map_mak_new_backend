const express = require("express");
const OrderService = require("../services/orders_service");
const router = express.Router();

const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

// Create a new order
router.post("/", async (req, res) => {
  const response = await OrderService.createOrder(req.body);
  handleResponse(res, response);
});

// Get an order by ID
router.get("/:id", async (req, res) => {
  const response = await OrderService.getOneOrderById(req.params.id);
  handleResponse(res, response);
});

// Get orders by customer email
router.get("/customer/:email", async (req, res) => {
  const response = await OrderService.getOrderByCustomerEmail(req.params.email);
  handleResponse(res, response);
});

// Update an order by ID
router.put("/:id", async (req, res) => {
  const response = await OrderService.editOrderById(req.params.id, req.body);
  handleResponse(res, response);
});

// Delete an order by ID
router.delete("/:id", async (req, res) => {
  const response = await OrderService.deleteOrder(req.params.id);
  handleResponse(res, response);
});

module.exports = router;
