const sequelize = require("../db/connection");
const Product = require("../models/Product");
const Category = require("../models/Category");
const { cloudinary } = require("../utils/cloudinary");

exports.adminCreateProduct = async (req, res) => {
  try {
    const data = req.body;
    const uploadResponse = await cloudinary.uploader.upload(data.product_img, {
      upload_preset: "ShoopingNV",
    });
    await sequelize.sync();

    const product = await Product.create({
      product_name: data.product_name,
      price: data.price,
      product_img: uploadResponse.url,
      category_id: data.category_id,
    });
    res.status(201).send({ product, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message, status: "fail" });
  }
};

exports.getCategoryProducts = async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const products = await Product.findAll({
      where: { category_id: category_id },
      include: Category,
    });
    res.status(200).send({ products, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.status(200).send({ products, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};
exports.adminUpdateProduct = async (req, res) => {
  try {
    const data = req.body;
    const product = await Product.findOne({
      where: { id: data.id },
    });
    if (product) {
      const uploadResponse = await cloudinary.uploader.upload(
        data.product_img,
        {
          upload_preset: "ShoopingNV",
        }
      );
      await product.update({
        product_name: data.product_name,
        price: data.price,
        product_img: uploadResponse.url,
        category_id: data.category_id,
      });
    }
    res.status(200).send({ product, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};
exports.createCategory = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    await sequelize.sync();

    const category = await Category.create({
      category_name: data.category_name,
    });
    res.status(201).send({ category, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    console.log(categories);
    res.status(200).send({ categories, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};
