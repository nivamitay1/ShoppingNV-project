const Cart = require("../models/Cart");
const Cart_item = require("../models/Cart_item");
const Product = require("../models/Product");

// const User = require("../models/User");
const sequelize = require("../db/connection");

exports.getOrCreateCart = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const cart = await Cart.findOne({
      where: { user_id: user_id, status: "open" },
      include: { model: Cart_item, include: Product },
    });
    if (cart) {
      let cartTotalPrice = 0;
      cart.cart_items.forEach((cartItem) => {
        cartTotalPrice = cartTotalPrice + Number(cartItem.total_price);
      });
      cart.dataValues.cartTotalPrice = cartTotalPrice;
      return res.status(200).send({ cart, status: "success" });
    } else {
      await sequelize.sync();

      const newCart = await Cart.create(
        {
          user_id: user_id,
          status: "open",
          created_at: new Date(),
          cart_items: [],
        },
        {
          include: [Cart_item],
        }
      );
      let cartTotalPrice = 0;
      newCart.dataValues.cartTotalPrice = cartTotalPrice;
      return res.status(201).send({ cart: newCart, status: "success" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "beaya", status: "fail" });
  }
};
exports.addItemToCart = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    await sequelize.sync();
    const cartItem = await Cart_item.create({
      total_price: data.total_price,
      quantity: data.quantity,
      product_id: data.product_id,
      cart_id: data.cart_id,
    });

    res.status(201).send({ cartItem, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "beaya", status: "fail" });
  }
};
exports.removeItemFromCart = (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const cartItem = Cart_item.build({ id: data.id }); // Create an instance of the item
    cartItem.destroy();
    res.status(200).send({ cartItem, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "beaya", status: "fail" });
  }
};
exports.updateQuantityItemInCart = (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const cartItem = Cart_item.build({ id: data.id }, { isNewRecord: false }); // Create an instance of the item
    const result = cartItem.update({
      quantity: data.newQuantity,
      total_price: data.newTotalPrice,
      id: cartItem.id,
    });
    res.status(200).send({ cartItem, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "beaya", status: "fail" });
  }
};
exports.clearTheCart = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    await Cart_item.destroy({ where: { cart_id: data.cart_id } });
    await Cart.update(
      { created_at: new Date() },
      { where: { id: data.cart_id } }
    );
    res.status(200).send({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "beaya", status: "fail" });
  }
};
