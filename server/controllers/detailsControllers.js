const Order = require("../models/Order");
const Product = require("../models/Product");
exports.getDetails = async (req, res) => {
  try {
    const orders = await Order.findAndCountAll();
    const products = await Product.findAndCountAll();
    console.log(products);
    res
      .status(200)
      .send({
        orders: orders.count,
        products: products.count,
        status: "success",
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "beaya", status: "fail" });
  }
};
