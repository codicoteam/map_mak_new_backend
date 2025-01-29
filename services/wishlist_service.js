const WishList = require("../models/wish_list_model");
const mongoose = require("mongoose");

const WishListService = {
  async createWishList(wishListData) {
    try {
      const newWishList = new WishList(wishListData);
      const savedWishList = await newWishList.save();
      return { status: 201, data: savedWishList };
    } catch (error) {
      console.error(error);
      return { status: 500, message: "Error creating wishlist" };
    }
  },

  async getOneWishListById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid wishlist ID" };
    }
    const wishList = await WishList.findById(id);
    if (!wishList) {
      return { status: 404, message: "Wishlist not found" };
    }
    return { status: 200, data: wishList };
  },

  async getWishListByCustomerEmail(email) {
    const wishLists = await WishList.find({ customerEmail: email });
    if (!wishLists.length) {
      return { status: 404, message: "No wishlists found for this email" };
    }
    return { status: 200, data: wishLists };
  },

  async editWishListById(id, wishListData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid wishlist ID" };
    }
    const updatedWishList = await WishList.findByIdAndUpdate(id, wishListData, { new: true });
    if (!updatedWishList) {
      return { status: 404, message: "Wishlist not found" };
    }
    return { status: 200, data: updatedWishList };
  },

  async deleteWishListById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid wishlist ID" };
    }
    const deletedWishList = await WishList.findByIdAndDelete(id);
    if (!deletedWishList) {
      return { status: 404, message: "Wishlist not found" };
    }
    return { status: 200, message: "Wishlist deleted successfully" };
  },

  async deleteWishListsByIds(wishListIds) {
    const result = await WishList.deleteMany({ _id: { $in: wishListIds } });
    if (result.deletedCount === 0) {
      return { status: 404, message: "No wishlists found to delete" };
    }
    return { status: 200, message: "Wishlists deleted successfully" };
  },
};

module.exports = WishListService;
