const mongoose = require("mongoose");

const CalorieEntrySchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CalorieEntry", CalorieEntrySchema);
