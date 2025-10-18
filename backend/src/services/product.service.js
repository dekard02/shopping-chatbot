const products = require("../mock-data/products.json");

exports.getProductsByColors = (colors) => {
  const colorSet = new Set(colors.map((c) => c.toLowerCase()));

  const matchedProducts = products.filter((product) =>
    colorSet.has(product.color.toLowerCase())
  );

  return matchedProducts;
};
