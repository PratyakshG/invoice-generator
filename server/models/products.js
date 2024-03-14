const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  product: String,
  quantity: Number,
  rate: Number,
});

const ProductModel = mongoose.model("Products", productSchema);

module.exports = ProductModel;
