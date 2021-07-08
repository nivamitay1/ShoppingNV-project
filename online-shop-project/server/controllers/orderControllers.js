const Order = require("../models/Order");
const User = require("../models/User");
const Cart_item = require("../models/Cart_item");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res) => {
  try {
    const data = req.body;
    const order = await Order.create({
      total_price: data.total_price,
      delivery_city: data.delivery_city,
      delivery_street: data.delivery_street,
      delivery_date: data.delivery_date,
      ordered_at: data.ordered_at,
      credit_card: data.credit_card,
      user_id: data.user_id,
      cart_id: data.cart_id,
    });
    const cart = Cart.build({ id: data.cart_id }, { isNewRecord: false }); // Create an instance of the cart
    cart.update({ status: "closed" }); // closing the cart
    res.status(200).send({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "beaya", status: "fail" });
  }
};
exports.getDeliveryDates = async (req, res) => {
  try {
    const unavailableDates = [];
    const deliveryDates = await Order.findAll({
      // get all the delivery dates
      attributes: ["delivery_date"],
    });
    for (let index = 0; index < deliveryDates.length; index++) {
      // counting how many times each delivery date appears
      const element = deliveryDates[index];
      element.counter = 0;
      deliveryDates.forEach((date) => {
        if (
          new Date(element.delivery_date).toDateString() ===
          new Date(date.delivery_date).toDateString()
        ) {
          element.counter++;
          if (element.counter >= 3) {
            unavailableDates.push(
              new Date(element.delivery_date).toDateString()
            );
          }
        }
      });
    }
    res.status(200).send({ unavailableDates, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "beaya", status: "fail" });
  }
};
