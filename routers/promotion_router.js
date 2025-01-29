const express = require("express");
const PromotionService = require("../services/promotion_service");
const router = express.Router();

const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

// Create a new promotion
router.post("/", async (req, res) => {
  const response = await PromotionService.createPromotion(req.body);
  handleResponse(res, response);
});

// Get all promotions with pagination
router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const response = await PromotionService.getAllPromotions(parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Get promotion by ID
router.get("/:id", async (req, res) => {
  const response = await PromotionService.getPromotionById(req.params.id);
  handleResponse(res, response);
});

// Edit a promotion by ID
router.put("/:id", async (req, res) => {
  const response = await PromotionService.editPromotion(req.params.id, req.body);
  handleResponse(res, response);
});

// Delete a promotion by ID
router.delete("/:id", async (req, res) => {
  const response = await PromotionService.deletePromotion(req.params.id);
  handleResponse(res, response);
});

// Delete multiple promotions by IDs
router.delete("/", async (req, res) => {
  const response = await PromotionService.deletePromotionsByIds(req.body.promotionIds);
  handleResponse(res, response);
});

// Search promotions by name with pagination
router.get("/search/name", async (req, res) => {
  const { name, page, size } = req.query;
  const response = await PromotionService.searchPromotionByName(name, parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Search promotions by category
router.get("/search/category", async (req, res) => {
  const { categoryId, page, size } = req.query;
  const response = await PromotionService.searchPromotionByCategory(categoryId, parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Filter promotions by price range
router.get("/filter/price", async (req, res) => {
  const { minPrice, maxPrice, page, size } = req.query;
  const response = await PromotionService.filterPromotionsByPriceRange(
    parseFloat(minPrice),
    parseFloat(maxPrice),
    parseInt(page),
    parseInt(size)
  );
  handleResponse(res, response);
});

// Filter promotions by discount range
router.get("/filter/discount", async (req, res) => {
  const { minDiscount, maxDiscount, page, size } = req.query;
  const response = await PromotionService.filterPromotionsByDiscountRange(
    parseFloat(minDiscount),
    parseFloat(maxDiscount),
    parseInt(page),
    parseInt(size)
  );
  handleResponse(res, response);
});

module.exports = router;
