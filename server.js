const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();



const productRouter = require("./routers/prouct_router.js");
const bulk_buyingRouter = require("./routers/bulk_bying_router.js") // Ensure this file path is correct
const categoryRouter = require("./routers/category_router.js")
const customer_centerRouter = require("./routers/customerCenter_router.js")
const furniturePackRouter = require("./routers/furniture_package_router.js")
const inviteRouter = require("./routers/invite_user_router.js")
const makepaymentRouter = require("./routers/makepayment_router.js")

const dbUrl = "mongodb://localhost:27017/FurnitureMapMak";
app.use(express.json());


mongoose
  .connect(dbUrl)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Error connecting to the database:", err));

app.use(cors());
app.use(bodyParser.json());


// Register main app routes
app.use("/api/v1/product", productRouter);
app.use("/api/v1/bulk_buying", bulk_buyingRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/customercenter", customer_centerRouter);
app.use("/api/v1/furniturepack", furniturePackRouter);
app.use("/api/v1/invite", inviteRouter);
app.use("/api/v1/make_payment", makepaymentRouter);


const port = 5050; // Correct capitalization
app.listen(port, () => {
  console.log(`The server is running at port: ${port}`);
});
