const express = require("express");
const WishListService = require("../services/wishlist_service");
const router = express.Router();

// Helper function to handle responses
const handleResponse = (res, serviceResponse) => {
  const { status, data, message } = serviceResponse;
  if (data) {
    res.status(status).json(data);
  } else {
    res.status(status).json({ message });
  }
};

// Route to create a new wishlist
router.post("/", async (req, res) => {
  const response = await WishListService.createWishList(req.body);
  handleResponse(res, response);
});

// Route to get a wishlist by ID
router.get("/:id", async (req, res) => {
  const response = await WishListService.getOneWishListById(req.params.id);
  handleResponse(res, response);
});

// Route to get wishlists by customer email
router.get("/customer/:email", async (req, res) => {
  const response = await WishListService.getWishListByCustomerEmail(req.params.email);
  handleResponse(res, response);
});

// Route to update a wishlist by ID
router.put("/:id", async (req, res) => {
  const response = await WishListService.editWishListById(req.params.id, req.body);
  handleResponse(res, response);
});

// Route to delete a wishlist by ID
router.delete("/:id", async (req, res) => {
  const response = await WishListService.deleteWishListById(req.params.id);
  handleResponse(res, response);
});

// Route to delete multiple wishlists by their IDs
router.delete("/", async (req, res) => {
  const response = await WishListService.deleteWishListsByIds(req.body.wishListIds);
  handleResponse(res, response);
});

module.exports = router;
