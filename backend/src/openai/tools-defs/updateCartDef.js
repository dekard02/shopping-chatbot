module.exports.updateCartDef = {
  type: "function",
  function: {
    name: "updateCart",
    description:
      "Add or remove multiple products from the user's cart and return updated cart",
    parameters: {
      type: "object",
      properties: {
        add: {
          type: "array",
          description:
            "List of products to add, each with productId and optional quantity",
          items: {
            type: "object",
            properties: {
              productId: { type: "string", description: "Product ID to add" },
              quantity: {
                type: "integer",
                description: "Quantity to add",
                default: 1,
              },
            },
            required: ["productId"],
          },
          default: [],
        },
        remove: {
          type: "array",
          description: "List of product IDs to remove from cart",
          items: { type: "string" },
          default: [],
        },
      },
      required: [],
    },
  },
};
