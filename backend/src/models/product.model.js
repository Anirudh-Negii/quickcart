import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },

  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 500,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  stock: {
    type: Number,
    required: true,
    min: 0,
  },

  image: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
