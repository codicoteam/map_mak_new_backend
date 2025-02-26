const express = require("express");
const BulkBuyingService = require("../services/bulk_buying_service");
const router = express.Router();

const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

// Create a new BulkBuying
router.post("/", async (req, res) => {
  const response = await BulkBuyingService.createBulkBuying(req.body);
  handleResponse(res, response);
});

// Get all BulkBuying records with pagination
router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const response = await BulkBuyingService.getAllBulkBuying(parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Get a single BulkBuying by ID
router.get("/:id", async (req, res) => {
  const response = await BulkBuyingService.getOneBulkBuying(req.params.id);
  handleResponse(res, response);
});

// Edit a BulkBuying by ID
router.put("/:id", async (req, res) => {
  const response = await BulkBuyingService.editBulkBuying(req.params.id, req.body);
  handleResponse(res, response);
});

// Delete a BulkBuying by ID
router.delete("/:id", async (req, res) => {
  const response = await BulkBuyingService.deleteBulkBuying(req.params.id);
  handleResponse(res, response);
});

// Delete multiple BulkBuying records by IDs
router.delete("/", async (req, res) => {
  const response = await BulkBuyingService.deleteBulkBuyingByIds(req.body.bulkBuyingIds);
  handleResponse(res, response);
});

// Search by category
router.get("/search/category", async (req, res) => {
  const { categoryId, page, size } = req.query;
  const response = await BulkBuyingService.searchCategory(categoryId, parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Search by color
router.get("/search/color", async (req, res) => {
  const { color, page, size } = req.query;
  const response = await BulkBuyingService.searchColor(color, parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Search by type
router.get("/search/type", async (req, res) => {
  const { type, page, size } = req.query;
  const response = await BulkBuyingService.searchType(type, parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Search by price range
router.get("/search/price", async (req, res) => {
  const { minPrice, maxPrice, page, size } = req.query;
  const response = await BulkBuyingService.rangePrice(parseFloat(minPrice), parseFloat(maxPrice), parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Search by feature
router.get("/search/feature", async (req, res) => {
  const { feature, page, size } = req.query;
  const response = await BulkBuyingService.searchByFeature(feature, parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Search by discount range
router.get("/search/discount", async (req, res) => {
  const { minDiscount, maxDiscount, page, size } = req.query;
  const response = await BulkBuyingService.rangeDiscount(parseFloat(minDiscount), parseFloat(maxDiscount), parseInt(page), parseInt(size));
  handleResponse(res, response);
});

module.exports = router;
