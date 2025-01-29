const express = require("express");
const HiringService = require("../services/hiring_service");
const router = express.Router();

const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

// Create a new hiring order
router.post("/", async (req, res) => {
  const response = await HiringService.hireProducts(req.body);
  handleResponse(res, response);
});

// Get a hiring order by ID
router.get("/:id", async (req, res) => {
  const response = await HiringService.getOneHiringById(req.params.id);
  handleResponse(res, response);
});

// Get hiring orders by customer email
router.get("/customer/:email", async (req, res) => {
  const response = await HiringService.getHiringByCustomerEmail(req.params.email);
  handleResponse(res, response);
});

// Edit a hiring order by ID
router.put("/:id", async (req, res) => {
  const response = await HiringService.editHiringById(req.params.id, req.body);
  handleResponse(res, response);
});

// Delete a hiring order by ID
router.delete("/:id", async (req, res) => {
  const response = await HiringService.deleteHiringById(req.params.id);
  handleResponse(res, response);
});

// Get a hiring order by order ID
router.get("/order/:orderId", async (req, res) => {
  const response = await HiringService.getHiringByOrderId(req.params.orderId);
  handleResponse(res, response);
});

module.exports = router;
