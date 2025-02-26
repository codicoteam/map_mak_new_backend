const express = require("express");
const ProductService = require("../services/product_service");
const router = express.Router();

const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

router.post("/", async (req, res) => {
  const response = await ProductService.createProduct(req.body);
  handleResponse(res, response);
});

router.get("/", async (req, res) => {
  const { page, size } = req.query;
  const response = await ProductService.getAllProduct(parseInt(page), parseInt(size));
  handleResponse(res, response);
});

router.get("/:id", async (req, res) => {
  const response = await ProductService.getOneProduct(req.params.id);
  handleResponse(res, response);
});

router.put("/:id", async (req, res) => {
  const response = await ProductService.editProduct(req.params.id, req.body);
  handleResponse(res, response);
});

router.delete("/:id", async (req, res) => {
  const response = await ProductService.deleteProduct(req.params.id);
  handleResponse(res, response);
});

router.delete("/", async (req, res) => {
  const response = await ProductService.deleteProductByIds(req.body.productIds);
  handleResponse(res, response);
});

router.get("/search/category", async (req, res) => {
  const { categoryId, page, size } = req.query;
  const response = await ProductService.searchCategory(categoryId, parseInt(page), parseInt(size));
  handleResponse(res, response);
});

// Add similar routes for searchColor, searchType, rangeProduct, searchByFeature, rangeDiscount, and getAllProductByName.

module.exports = router;
