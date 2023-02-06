const AuthServices = require("../services/auth.services");
const transporter = require("../utils/mailer");

const register = async (req, res) => {
  try {
    const user = req.body;
    const result = await AuthServices.register(user);
    if (result) {
      res.status(201).json({ message: "user created" });
      await transporter.sendMail({
        to: result.email,
        from: "simonchumacero26@gmail.com",
        subject: "Email confirmation",
        html: "<h1> Successful registration </h1> <p> Tienes que confimar tu email </p> <a href='#' target='new_blank'> enlace </a>",
      });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not email provided",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not password provided",
      });
    }
    const result = await AuthServices.login({ email, password });
    if (result.isValid) {
      const { username, id, email } = result.user;
      const userData = { username, id, email };
      const token = AuthServices.genToken(userData);
      userData.token = token;
      res.json(userData);
    } else {
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something wrong",
    });
  }
};



module.exports = {
  register,
  login
};
