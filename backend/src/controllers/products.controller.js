const products = require("../mock-data/products.json")

module.exports.getProducts = (req, res) => {
  return products;
}

module.exports.getDetailProduct = (req, res) => {
  const id = req.params.id;
  const product = products.find((e) => e.id === id)

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  res.send(user);
}