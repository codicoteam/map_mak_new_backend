const express = require("express");
const OnDemandService = require("../services/onDemand_service");
const router = express.Router();

const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

// Create a new OnDemand product
router.post("/", async (req, res) => {
  const response = await OnDemandService.createProduct(req.body);
  handleResponse(res, response);
});

// Get all OnDemand products with pagination
router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const response = await OnDemandService.getAllProduct(parseInt(page) || 1, parseInt(size) || 10);
  handleResponse(res, response);
});

// Get a single OnDemand product by ID
router.get("/:id", async (req, res) => {
  const response = await OnDemandService.getOneProduct(req.params.id);
  handleResponse(res, response);
});

// Edit an existing OnDemand product by ID
router.put("/:id", async (req, res) => {
  const response = await OnDemandService.editProduct(req.params.id, req.body);
  handleResponse(res, response);
});

// Delete a single OnDemand product by ID
router.delete("/:id", async (req, res) => {
  const response = await OnDemandService.deleteProduct(req.params.id);
  handleResponse(res, response);
});

module.exports = router;
