const express = require("express");
const LocationService = require("../services/location_service");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const result = await LocationService.createLocation(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
  }
});

router.get("/getall", async (req, res) => {
  try {
    const result = await LocationService.getAllLocationsNoPagination();
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await LocationService.getOneLocation(req.params.id);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await LocationService.editLocation(req.params.id, req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await LocationService.deleteLocation(req.params.id);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { locationIds } = req.body;
    if (!Array.isArray(locationIds) || locationIds.length === 0) {
      return res.status(400).json({ status: 400, message: "Invalid location IDs array" });
    }
    const result = await LocationService.deleteLocationByIds(locationIds);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
  }
});

router.get("/search/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const result = await LocationService.searchByCity(city);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
