module.exports.filterProductsDef = {
  type: "function",
  function: {
    name: "filterProducts",
    description:
      "Filter fashion products by color, size, occasion, and price range",
    parameters: {
      type: "object",
      properties: {
        colors: {
          type: "array",
          items: { type: "string" },
          description: "Preferred colors (e.g., red, black)",
        },
        sizes: {
          type: "array",
          items: { type: "string" },
          description: "Preferred sizes (e.g., S, M, L)",
        },
        occasion: {
          type: "string",
          description:
            "The occasion the user is shopping for (e.g., wedding, casual, work)",
        },
        minPrice: {
          type: "number",
          description: "Minimum price the user wants to pay",
        },
        maxPrice: {
          type: "number",
          description: "Maximum price the user is willing to pay",
        },
      },
    },
  },
};
