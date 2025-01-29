const express = require("express");
const OnDisplayService = require("../services/onDisplay_service");
const router = express.Router();

const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

// Create a new OnDisplay item
router.post("/", async (req, res) => {
  const response = await OnDisplayService.createOnDisplay(req.body);
  handleResponse(res, response);
});

// Get all OnDisplay items with pagination
router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const response = await OnDisplayService.getAllOnDisplay(parseInt(page) || 1, parseInt(size) || 10);
  handleResponse(res, response);
});

// Get a single OnDisplay item by ID
router.get("/:id", async (req, res) => {
  const response = await OnDisplayService.getOneOnDisplay(req.params.id);
  handleResponse(res, response);
});

// Edit an existing OnDisplay item by ID
router.put("/:id", async (req, res) => {
  const response = await OnDisplayService.editOnDisplay(req.params.id, req.body);
  handleResponse(res, response);
});

// Delete a single OnDisplay item by ID
router.delete("/:id", async (req, res) => {
  const response = await OnDisplayService.deleteOnDisplay(req.params.id);
  handleResponse(res, response);
});

module.exports = router;
