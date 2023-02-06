const transporter = require("../utils/mailer");
const CartServices = require("../services/cart.services");
const { sendMail } = require("../utils/mailer");

const showProductsInCart = async (req, res) => {
  try {
    const userInfo = req.body;
    const result = await CartServices.showProducts(userInfo);
    if (result) {
      res.json(result);
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addProductsToCart = async (req, res) => {
  try {
    const productInfo = req.body;
    const result = await CartServices.addProducts(productInfo);
    if (result) {
      res.json(result);
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const buyProductsInCart = async (req, res) => {
  try {
    const { email } = req.body;
    const check = await CartServices.checkAvailable(email);
    const { isValid, noBuyMessage } = check;
    if (isValid) {
      console.log(`Todo bien con los productos`);
      const result = await CartServices.buy(email);
      res.json(result);
      await transporter.sendMail({
        to: email,
        from: "simonchumacero26@gmail.com",
        subject: "Purchase confirmation!",
        html: "<h1> Successful purchase </h1> <p> La compra ha sido exitosa </p> <a href='#' target='new_blank'> enlace </a>",
      });
    } else {
      res.status(400).json({ message: noBuyMessage });
    }
  } catch (error) {
    res.status(400).json({ message: "something went wrong " });
  }
};

const showAllOrders = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await CartServices.showOrder(email);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "something went wrong " });
  }
};

module.exports = {
  showProductsInCart,
  addProductsToCart,
  buyProductsInCart,
  showAllOrders,
};
