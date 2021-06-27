const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");
const Category = require("./Category");

class Product extends Model {}
Product.init(
  {
    product_name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    product_img: { type: DataTypes.TEXT, allowNull: false },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "product", timestamps: false }
);

Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

module.exports = Product;
