const express = require("express");
const {
  addEntry,
  getAllEntries,
  getEntriesByDate,
} = require("../controllers/calorieController");
const router = express.Router();

router.post("/", addEntry);
router.get("/", getAllEntries);
router.get("/:date", getEntriesByDate);

module.exports = router;
