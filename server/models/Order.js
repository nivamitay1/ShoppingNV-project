const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");
const User = require("./User");
const Cart = require("./Cart");

class Order extends Model {}
Order.init(
  {
    total_price: { type: DataTypes.DECIMAL, allowNull: false },
    delivery_city: { type: DataTypes.STRING, allowNull: false },
    delivery_street: { type: DataTypes.STRING, allowNull: false },
    delivery_date: { type: DataTypes.STRING, allowNull: false },
    ordered_at: { type: DataTypes.STRING, allowNull: false },
    credit_card: { type: DataTypes.STRING, allowNull: false },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cart,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "order", timestamps: false }
);

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });
Cart.hasMany(Order, { foreignKey: "cart_id" });
Order.belongsTo(Cart, { foreignKey: "cart_id" });

module.exports = Order;
