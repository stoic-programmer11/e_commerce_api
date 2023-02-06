const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./utils/database");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');

const app = express();

app.use(express.json()); // JSON to Javascript Object
app.use(cors()); // Origenes cruzados / peticion de netlify a raleway
app.use(morgan("tiny")); // Ver datos en consola, sirve para detectar errores

db.sync({force: false})
  .then(() => console.log('Autenticacion exitosa'))
  .catch((error) => console.log(error))

db.authenticate()
  .then(() => console.log("Base de datos autenticada"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my server",
  });   
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);

module.exports = app;
