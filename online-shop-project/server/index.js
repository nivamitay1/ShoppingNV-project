//  IMPORT PACKAGES
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

//   IMPORT ROUTES
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const detailsRouter = require("./routes/detailsRoutes");

// MIDDLEWARE
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

// connect to DB
const sequelize = require("./db/connection");
console.log(process.env.DATABASE);

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/details", detailsRouter);

app.use(express.static("public/build"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/build", "index.html"));
});

// EXPORT APP
module.exports = app;
