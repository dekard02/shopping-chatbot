const { getProductsByColors } = require("../../services/product.service");
const { getProductsByColorsDef } = require("./getProductByColorsDef");

module.exports.toolDefinitions = [getProductsByColorsDef];

module.exports.toolHandlers = {
  getProductsByColors,
};
