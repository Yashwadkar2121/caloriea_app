const CalorieEntry = require("../models/CalorieEntry");

// Add a new calorie entry
exports.addEntry = async (req, res) => {
  try {
    const { foodName, calories, date } = req.body;

    // Validate required fields
    if (!foodName || !calories) {
      return res
        .status(400)
        .json({ message: "foodName and calories are required." });
    }

    const newEntry = new CalorieEntry({
      foodName,
      calories,
      date: date ? new Date(date) : undefined, // Use provided date or default
    });

    await newEntry.save();
    res
      .status(201)
      .json({ message: "Entry added successfully", entry: newEntry });
  } catch (error) {
    res.status(500).json({ message: "Error adding entry", error });
  }
};

// Get all entries
exports.getAllEntries = async (req, res) => {
  try {
    const entries = await CalorieEntry.find().sort({ date: -1 }); // Sorted by date (newest first)
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching entries", error });
  }
};

// Get entries by a specific date or date range
exports.getEntriesByDate = async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ message: "Date parameter is required." });
    }

    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999); // Include the entire day

    const entries = await CalorieEntry.find({
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });

    if (entries.length === 0) {
      return res
        .status(404)
        .json({ message: "No entries found for the specified date." });
    }

    res.status(200).json(entries);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching entries for the date", error });
  }
};
