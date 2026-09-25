import productModel from "../models/product.model.js";

// Create a new product
export async function createProduct(req, res) {
  const { name, description, price, stock, image } = req.body;

  const product = await productModel.create({
    name,
    description,
    price,
    stock,
    image,
  });

  return res.status(201).json({
    message: "Product created successfully",
    data: {
      product,
    },
  });
}

// Get all products
export async function getProducts(req, res) {
  const products = await productModel.find();

  return res.status(200).json({
    message: "All products fetched successfully",
    data: {
      products,
    },
  });
}
