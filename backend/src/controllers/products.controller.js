const products = require("../mock-data/products.json");
const catchAsync = require("../errors/catchAsync");
const ApiError = require("../errors/ApiError");
const { status } = require("http-status");

module.exports.getProducts = catchAsync((req, res) => {
  return res.json(products);
});

module.exports.getDetailProduct = catchAsync((req, res) => {
  const id = req.params.id;
  const product = products.find((e) => e.id === id);

  if (!product) {
    throw new ApiError(status.NOT_FOUND, "Product not found");
  }

  res.send(product);
});
