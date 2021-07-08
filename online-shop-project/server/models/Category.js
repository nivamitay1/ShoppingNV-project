const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

class Category extends Model {}
Category.init(
  {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "category",
    timestamps: false,
  }
);
module.exports = Category;
