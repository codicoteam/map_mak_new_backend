const express = require("express");
const CategoryService = require("../services/category_service");
const router = express.Router();

const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

// Create a new category
router.post("/", async (req, res) => {
  const response = await CategoryService.createCategory(req.body);
  handleResponse(res, response);
});

// Get all categories with pagination
router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const response = await CategoryService.getAllCategories(parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Get a single category by ID
router.get("/:id", async (req, res) => {
  const response = await CategoryService.getOneCategory(req.params.id);
  handleResponse(res, response);
});

// Edit a category by ID
router.put("/:id", async (req, res) => {
  const response = await CategoryService.editCategory(req.params.id, req.body);
  handleResponse(res, response);
});

// Delete a single category by ID
router.delete("/:id", async (req, res) => {
  const response = await CategoryService.deleteCategory(req.params.id);
  handleResponse(res, response);
});

// Delete multiple categories by IDs
router.delete("/", async (req, res) => {
  const response = await CategoryService.deleteCategoriesByIds(req.body.categoryIds);
  handleResponse(res, response);
});



module.exports = router;
