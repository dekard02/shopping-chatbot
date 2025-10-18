const express = require("express");
const { handleChat } = require("../controllers/chat.controller");
const {
  getProducts,
  getDetailProduct,
} = require("../controllers/products.controller");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/chat",
    route: express.Router().post("/:conversationId", handleChat),
  },
  {
    path: "/products",
    route: express.Router().get("/", getProducts).get("/:id", getDetailProduct),
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
