const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");
const Product = require("./Product");
const Cart = require("./Cart");

class Cart_item extends Model {}
Cart_item.init(
  {
    total_price: { type: DataTypes.DECIMAL, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
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
  { sequelize, modelName: "cart_item", timestamps: false }
);

Product.hasMany(Cart_item, { foreignKey: "product_id" });
Cart_item.belongsTo(Product, { foreignKey: "product_id" });
Cart.hasMany(Cart_item, { foreignKey: "cart_id" });
Cart_item.belongsTo(Cart, { foreignKey: "cart_id" });

module.exports = Cart_item;
