module.exports.getProductsByColorsDef = {
  type: "function",
  function: {
    name: "getProductsByColors",
    description: "Get all products that match one or more colors",
    parameters: {
      type: "object",
      properties: {
        colors: {
          type: "array",
          items: {
            type: "string",
          },
          description: "List of colors to filter products by",
        },
      },
      required: ["colors"],
    },
  },
};
