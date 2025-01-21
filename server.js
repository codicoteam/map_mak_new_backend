const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const productRouter = require("./routers/prouct_router.js"); // Ensure this file path is correct
const dbUrl = "mongodb://localhost:27017/FurnitureMapMak";

mongoose
  .connect(dbUrl)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Error connecting to the database:", err));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Register main app routes
app.use("/api/v1/product", productRouter);

const port = 5050; // Correct capitalization
app.listen(port, () => {
  console.log(`The server is running at port: ${port}`);
});
