const User = require("../models/User");
const sequelize = require("../db/connection");
const bcrypt = require("bcrypt");
const Cart = require("../models/Cart");
const Cart_item = require("../models/Cart_item");

exports.register = async (req, res) => {
  try {
    const data = req.body;
    if (!data.city) {
      // first sign up step

      const user = await User.findOne({
        where: { email: data.email },
      });

      if (user) {
        return res
          .status(203)
          .send({ message: "This Email address is taken", status: "fail" });
      }
      if (data.password !== data.confirmPassword) {
        return res.status(203).send({
          message: "Password and confirm password does not match ",
          status: "fail",
        });
      }
      return res.status(200).send({ status: "success", message: "continue" });
    }

    // second sign up step

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await sequelize.sync();

    const [user, created] = await User.findOrCreate({
      where: { email: data.email },
      defaults: {
        first_name: data.firstName,
        last_name: data.lastName,
        password: hashedPassword,
        city: data.city,
        street: data.street,

        role: "Client",
      },
    });

    res
      .status(201)
      .send({ newUser: user, message: "Account created", status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "beaya", status: "fail" });
  }
};
exports.login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({
      where: { email: data.email },
      include: [
        {
          model: Cart,
          where: {
            status: "open",
          },
          include: Cart_item,
          required: false,
        },
      ],
    });
    if (user) {
      const match = await bcrypt.compare(data.password, user.password);
      console.log(data.password, user.password);

      if (match && data) {
        if (user.email === "AdminAdmin@gmail.com") {
          // check if Admin
          return res.status(202).send({ status: "success", user });
        }
        let cartTotalPrice = 0;
        user.carts[0].cart_items.forEach((item) => {
          cartTotalPrice = cartTotalPrice + Number(item.total_price);
        });
        console.log(cartTotalPrice);
        return res
          .status(202)
          .send({ status: "success", user: user, cartTotalPrice });
      } else {
        return res
          .status(203)
          .send({ status: "fail", message: "Wrong  password" });
      }
    } else {
      return res
        .status(203)
        .send({ status: "fail", message: "Wrong email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "beaya", status: "fail" });
  }
};
