const ProductServices = require("../services/product.services");
const transporter = require("../utils/mailer");

const create = async (req, res) => {
  try {
    const productInfo = req.body;
    const result = await ProductServices.create(productInfo);
    if (result) {
      res.status(201).json({ message: "product created" });
      await transporter.sendMail({
        to: "simonchumacero26@gmail.com",
        from: "simonchumacero26@gmail.com",
        subject: "Email confirmation",
        html: `<h1> Producto Creado </h1> <p> ${result.name} </p> <a href='#' target='new_blank'> enlace </a>`,
      });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const result = await ProductServices.show();
    if (result) {
      res.json(result);
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  create,
  show,
};
