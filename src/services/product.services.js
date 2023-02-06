const models = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class ProductServices {
  
  static async create(product) {
    try {
      const result = await models.product.create(product);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async show() {
    try {
      const result = await models.product.findAll({
        where: {
          availableQty: {
            [Op.gt]: 0,
          },
        },
        include: {
          attributes: ["username"],
          model: models.user,
          as: "user",
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductServices;
