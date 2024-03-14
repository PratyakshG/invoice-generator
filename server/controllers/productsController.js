const Products = require("../models/products");

const addProduct = async (req, res) => {
  try {
    const { product, quantity, rate } = req.body;

    if (!product || !quantity || !rate) {
      return res.json({
        error: "all fields are required",
      });
    }

    const products = await Products.create({
      product,
      quantity,
      rate,
    });

    return res.json(products);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addProduct,
};
