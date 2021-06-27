const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");
const User = require("./User");

class Cart extends Model {}
Cart.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    status: { type: DataTypes.STRING, allowNull: false },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: "cart", timestamps: false }
);

User.hasMany(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

module.exports = Cart;
