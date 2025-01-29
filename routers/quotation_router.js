const express = require("express");
const QuotationService = require("../services/quotation_service");
const router = express.Router();

const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

// Create a new quotation
router.post("/", async (req, res) => {
  const response = await QuotationService.createQuotation(req.body);
  handleResponse(res, response);
});

// Get all quotations with pagination
router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const response = await QuotationService.getAllQuotations(parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Get a single quotation by ID
router.get("/:id", async (req, res) => {
  const response = await QuotationService.getOneQuotation(req.params.id);
  handleResponse(res, response);
});

// Edit an existing quotation
router.put("/:id", async (req, res) => {
  const response = await QuotationService.editQuotation(req.params.id, req.body);
  handleResponse(res, response);
});

// Delete a quotation by ID
router.delete("/:id", async (req, res) => {
  const response = await QuotationService.deleteQuotation(req.params.id);
  handleResponse(res, response);
});

module.exports = router;
