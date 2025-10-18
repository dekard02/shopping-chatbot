const { viewCart, updateCart } = require("../../services/cart.service");
const { filterProducts } = require("../../services/product.service");
const { filterProductsDef } = require("./filterProductsDef");
const { updateCartDef } = require("./updateCartDef");
const { viewCartDef } = require("./viewCartDef");

module.exports.toolDefinitions = [
  filterProductsDef,
  updateCartDef,
  viewCartDef,
];

module.exports.toolHandlers = {
  filterProducts,
  viewCart,
  updateCart,
};
