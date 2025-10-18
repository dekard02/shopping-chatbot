const products = require("../mock-data/products.json");

exports.findProductById = (id) => {
  return products.find((p) => p.id === id);
};

exports.filterProducts = async (
  conversationId,
  { colors, sizes, occasion, minPrice, maxPrice }
) => {
  const result = products
    .filter((product) => {
      // Color match (if specified)
      if (colors && colors.length > 0) {
        const colorMatch = colors
          .map((c) => c.toLowerCase())
          .includes(product.color.toLowerCase());
        if (!colorMatch) return false;
      }

      // Size match (if specified)
      if (sizes && sizes.length > 0) {
        const sizeMatch = sizes.some((size) =>
          product.sizes.includes(size.toUpperCase())
        );
        if (!sizeMatch) return false;
      }

      // Occasion match (if specified)
      if (occasion) {
        const occasionMatch = product.occasions
          .map((o) => o.toLowerCase())
          .includes(occasion.toLowerCase());
        if (!occasionMatch) return false;
      }

      // Price match (if specified)
      if (minPrice !== undefined && product.price < minPrice) return false;
      if (maxPrice !== undefined && product.price > maxPrice) return false;

      return true;
    })
    .sort((a, b) => b.soldCount - a.soldCount);

  console.log("filterProducts result count: ", result.length);

  return {
    count: result.length,
    result,
  };
};
