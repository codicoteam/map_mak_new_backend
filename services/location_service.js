const Location = require("../models/location_model");
const mongoose = require("mongoose");

const LocationService = {
  async editLocation(id, locationData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid location ID" };
    }
    const updatedLocation = await Location.findByIdAndUpdate(id, locationData, { new: true });
    if (!updatedLocation) {
      return { status: 404, message: "Location not found" };
    }
    return { status: 200, data: updatedLocation };
  },

  async deleteLocationByIds(locationIds) {
    const result = await Location.deleteMany({ _id: { $in: locationIds } });
    if (result.deletedCount === 0) {
      return { status: 404, message: "No locations found to delete" };
    }
    return { status: 200, message: "Locations deleted successfully" };
  },

  async deleteLocation(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid location ID" };
    }
    const deletedLocation = await Location.findByIdAndDelete(id);
    if (!deletedLocation) {
      return { status: 404, message: "Location not found" };
    }
    return { status: 200, message: "Location deleted successfully" };
  },

  async createLocation(locationData) {
    const newLocation = new Location(locationData);
    const savedLocation = await newLocation.save();
    return { status: 201, data: savedLocation };
  },

  async getAllLocations(page = 1, size = 10) {
    const skip = (page - 1) * size;
    const locations = await Location.find().skip(skip).limit(size);
    const total = await Location.countDocuments();
    return { status: 200, data: { locations, total, page, size } };
  },

  async getOneLocation(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { status: 400, message: "Invalid location ID" };
    }
    const location = await Location.findById(id);
    if (!location) {
      return { status: 404, message: "Location not found" };
    }
    return { status: 200, data: location };
  },

  async searchByCity(city, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const locations = await Location.find({ city }).skip(skip).limit(size);
    const total = await Location.countDocuments({ city });
    if (!locations.length) {
      return { status: 404, message: "No locations found in this city" };
    }
    return { status: 200, data: { locations, total, page, size } };
  },

  async searchByCountry(country, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const locations = await Location.find({ country }).skip(skip).limit(size);
    const total = await Location.countDocuments({ country });
    if (!locations.length) {
      return { status: 404, message: "No locations found in this country" };
    }
    return { status: 200, data: { locations, total, page, size } };
  },

  async searchByCoordinates(latitude, longitude, range = 1, page = 1, size = 10) {
    const skip = (page - 1) * size;
    const locations = await Location.find({
      latitude: { $gte: latitude - range, $lte: latitude + range },
      longitude: { $gte: longitude - range, $lte: longitude + range }
    }).skip(skip).limit(size);
    const total = await Location.countDocuments({
      latitude: { $gte: latitude - range, $lte: latitude + range },
      longitude: { $gte: longitude - range, $lte: longitude + range }
    });
    if (!locations.length) {
      return { status: 404, message: "No locations found within the specified coordinates" };
    }
    return { status: 200, data: { locations, total, page, size } };
  }
};

module.exports = LocationService;
