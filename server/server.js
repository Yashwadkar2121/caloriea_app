require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const calorieRoutes = require("./routes/calorieRoutes");
const connectToMongo = require("./db/connection");

connectToMongo();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/entries", calorieRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
