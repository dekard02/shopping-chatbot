const LRU = require("lru-cache");
const { findProductById } = require("./product.service");

const options = {
  max: 1000,
  ttl: 1000 * 60 * 60 * 2,
};

const cartCache = new LRU.LRUCache(options);

module.exports.viewCart = (conversationId) => {
  return cartCache.get(conversationId) || [];
};

module.exports.updateCart = (conversationId, operations) => {
  let cart = cartCache.get(conversationId) || [];

  if (operations.add && Array.isArray(operations.add)) {
    for (const item of operations.add) {
      const product = findProductById(item.productId);
      if (!product) continue;
      const qty = item.quantity && item.quantity > 0 ? item.quantity : 1;
      for (let i = 0; i < qty; i++) {
        cart.push(product);
      }
    }
  }

  if (operations.remove && Array.isArray(operations.remove)) {
    cart = cart.filter((product) => !operations.remove.includes(product.id));
  }

  cartCache.set(conversationId, cart);

  return cart;
};
