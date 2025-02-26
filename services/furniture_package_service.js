const PackageModels = require("../models/furniture_package_model");
const mongoose = require("mongoose");

const PackageService = {
  async editPackage(id, packageData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid package ID" };
    }
    const updatedPackage = await PackageModels.findByIdAndUpdate(
      id,
      packageData,
      { new: true }
    );
    if (!updatedPackage) {
      return { status: 404, message: "Package not found" };
    }
    return { status: 200, data: updatedPackage };
  },

  async deletePackageByIds(packageIds) {
    const result = await PackageModels.deleteMany({ _id: { $in: packageIds } });
    if (result.deletedCount === 0) {
      return { status: 404, message: "No packages found to delete" };
    }
    return { status: 200, message: "Packages deleted successfully" };
  },

  async deletePackage(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid package ID" };
    }
    const deletedPackage = await PackageModels.findByIdAndDelete(id);
    if (!deletedPackage) {
      return { status: 404, message: "Package not found" };
    }
    return { status: 200, message: "Package deleted successfully" };
  },

  async createPackage(packageData) {
    const newPackage = new PackageModels(packageData);
    const savedPackage = await newPackage.save();
    return { status: 201, data: savedPackage };
  },

  async searchPackageColor(color, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const packages = await PackageModels.find({ colors: color })
      .skip(skip)
      .limit(size);
    const total = await PackageModels.countDocuments({ colors: color });
    if (!packages.length) {
      return { status: 404, message: "No packages found with this color" };
    }
    return { status: 200, data: { packages, total, page, size } };
  },

  async searchPackageType(type, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const packages = await PackageModels.find({
      "packageAttributes.type": type,
    })
      .skip(skip)
      .limit(size);
    const total = await PackageModels.countDocuments({
      "packageAttributes.type": type,
    });
    if (!packages.length) {
      return { status: 404, message: "No packages found of this type" };
    }
    return { status: 200, data: { packages, total, page, size } };
  },

  async rangePackage(minPrice, maxPrice, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const packages = await PackageModels.find({
      packagePrice: { $gte: minPrice, $lte: maxPrice },
    })
      .skip(skip)
      .limit(size);
    const total = await PackageModels.countDocuments({
      packagePrice: { $gte: minPrice, $lte: maxPrice },
    });
    if (!packages.length) {
      return { status: 404, message: "No packages found in this price range" };
    }
    return { status: 200, data: { packages, total, page, size } };
  },

  async searchByFeature(feature, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const packages = await PackageModels.find({
      "packageAttributes.feature": feature,
    })
      .skip(skip)
      .limit(size);
    const total = await PackageModels.countDocuments({
      "packageAttributes.feature": feature,
    });
    if (!packages.length) {
      return { status: 404, message: "No packages found with this feature" };
    }
    return { status: 200, data: { packages, total, page, size } };
  },

  async rangeDiscount(minDiscount, maxDiscount, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const packages = await PackageModels.find({
      packageDiscount: { $gte: minDiscount, $lte: maxDiscount },
    })
      .skip(skip)
      .limit(size);
    const total = await PackageModels.countDocuments({
      packageDiscount: { $gte: minDiscount, $lte: maxDiscount },
    });
    if (!packages.length) {
      return {
        status: 404,
        message: "No packages found in this discount range",
      };
    }
    return { status: 200, data: { packages, total, page, size } };
  },

  async getAllPackages(page = 1, size = 10) {
    const skip = (page - 1) * size;
    const packages = await PackageModels.find()
      .populate("Location") // Populating Location
      .populate("packageCategories") // Populating Categories
      .skip(skip)
      .limit(size);

    const total = await PackageModels.countDocuments();
    return { status: 200, data: { packages, total, page, size } };
  },

  async getOnePackage(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid package ID" };
    }
    const package = await PackageModels.findById(id)
      .populate("Location") // Populating Location
      .populate("packageCategories"); // Populating Categories

    if (!package) {
      return { status: 404, message: "Package not found" };
    }
    return { status: 200, data: package };
  },

  async searchPackageCategory(categoryId, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const packages = await PackageModels.find({
      packageCategories: categoryId, // Search by category ID
    })
      .populate("Location")
      .populate("packageCategories")
      .skip(skip)
      .limit(size);
  
    const total = await PackageModels.countDocuments({
      packageCategories: categoryId, // Count packages by category ID
    });
  
    if (!packages.length) {
      return { status: 404, message: "No packages found in this category" };
    }
  
    return { status: 200, data: { packages, total, page, size } };
  }
  
};

module.exports = PackageService;
