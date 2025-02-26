const express = require("express");
const PackageService = require("../services/furniture_package_service");
const router = express.Router();

const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

// Create a new package
router.post("/", async (req, res) => {
  const response = await PackageService.createPackage(req.body);
  handleResponse(res, response);
});

// Get all packages with pagination
router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const response = await PackageService.getAllPackages(parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Get a package by ID
router.get("/:id", async (req, res) => {
  const response = await PackageService.getOnePackage(req.params.id);
  handleResponse(res, response);
});

// Update a package by ID
router.put("/:id", async (req, res) => {
  const response = await PackageService.editPackage(req.params.id, req.body);
  handleResponse(res, response);
});

// Delete a package by ID
router.delete("/:id", async (req, res) => {
  const response = await PackageService.deletePackage(req.params.id);
  handleResponse(res, response);
});

// Delete multiple packages by IDs
router.delete("/", async (req, res) => {
  const response = await PackageService.deletePackageByIds(req.body.packageIds);
  handleResponse(res, response);
});

// Search packages by category
router.get("/search/category", async (req, res) => {
  const { categoryId, page, size } = req.query;
  const response = await PackageService.searchPackageCategory(categoryId, parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Search packages by color
router.get("/search/color", async (req, res) => {
  const { color, page, size } = req.query;
  const response = await PackageService.searchPackageColor(color, parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Search packages by type
router.get("/search/type", async (req, res) => {
  const { type, page, size } = req.query;
  const response = await PackageService.searchPackageType(type, parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Search packages by feature
router.get("/search/feature", async (req, res) => {
  const { feature, page, size } = req.query;
  const response = await PackageService.searchByFeature(feature, parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Search packages by price range
router.get("/range/price", async (req, res) => {
  const { minPrice, maxPrice, page, size } = req.query;
  const response = await PackageService.rangePackage(parseFloat(minPrice), parseFloat(maxPrice), parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Search packages by discount range
router.get("/range/discount", async (req, res) => {
  const { minDiscount, maxDiscount, page, size } = req.query;
  const response = await PackageService.rangeDiscount(parseFloat(minDiscount), parseFloat(maxDiscount), parseInt(page), parseInt(size));
  handleResponse(res, response);
});

module.exports = router;
