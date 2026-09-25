import productModel from "../models/product.model.js";

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
