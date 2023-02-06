const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const options = {
  apis: [
    "./src/routes/auth.routes.js",
    "./src/models/user.js",
    "./src/routes/product.routes.js",
    "./src/models/product.js",
    "./src/models/product_in_cart.js",
    "./src/routes/cart.routes.js",
    "./src/models/order.js"
  ],
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E_COMMERCE_API",
      version: "0.0.8",
      description: "API para ecommerce",
    },
  },
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader({ "Content-Type": "application/json" });
    res.send(swaggerSpec);
  });
  console.log(
    `Documentation available in ${process.env.URL}:${port}/api/v1/docs`
  );
};

module.exports = swaggerDocs;
