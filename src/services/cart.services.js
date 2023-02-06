const models = require("../models");
const { Op, where, json } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class CartServices {
  static async showProducts(userInfo) {
    try {
      const { email } = userInfo;
      // Conseguimos el id del usuario con el email
      const userId = await models.user.findOne({
        where: {
          email: {
            [Op.eq]: email,
          },
        },
      });
      const { id } = userId;
      // Obtenemos el id del carrito cuyo userid coincida con el userId
      const cart = await models.cart.findOne({
        where: {
          user_id: {
            [Op.eq]: id,
          },
        },
      });
      const cartId = cart.id;
      const productsInCart = await models.product_in_cart.findAll({
        where: {
          cart_id: {
            [Op.eq]: cartId,
          },
        },
      });
      return productsInCart;
    } catch (error) {
      throw error;
    }
  }

  static async addProducts(productInfo) {
    try {
      const { email, productId, quantity } = productInfo;

      // Conseguimos el id del usuario mediante su correo
      const user = await models.user.findOne({
        where: {
          email: {
            [Op.eq]: email,
          },
        },
      });
      const userId = user.id;

      // Conseguimos el cartId del usuario
      const cart = await models.cart.findOne({
        where: {
          user_id: {
            [Op.eq]: userId,
          },
        },
      });

      const cartId = cart.id;
      console.log(`cartId del usuario ${cartId}`);

      // // Conseguimos el precio de product
      const product = await models.product.findOne({
        where: {
          id: {
            [Op.eq]: productId,
          },
        },
      });
      const { price, availableQty } = product;
      console.log(`precio del producto ${product.price}`);
      const status = availableQty <= 0 ? "not_available" : "available";
      const priceInCart = price * quantity;
      console.log(`Precio total ${priceInCart}`);
      //console.log(price);

      // Actualizamos el total_price de la tabla cart al añadir un producto al cart
      let cartTotalPrice = cart.total_price;
      cartTotalPrice = cartTotalPrice + priceInCart;
      await models.cart.update(
        {
          total_price: cartTotalPrice,
        },
        {
          where: { id: cartId },
        }
      );
      // //console.log(cartId);
      const result = await models.product_in_cart.create({
        cart_id: cartId,
        product_id: productId,
        quantity: quantity,
        price: priceInCart,
        status: status,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async checkAvailable(email) {
    try {
      // Conseguimos el cartId del usuario con este correo
      const cart = await models.user.findOne({
        where: { email: email },
      });
      const cartId = cart.id;

      // Traemos todos los productos que coincidan con el id del usuario
      const productsInCart = await models.product_in_cart.findAll({
        where: { cart_id: cartId },
      });

      // Ver si todos los productos estan disponible
      let counter = 0;
      let notAddedProducts = [];

      for (let i = 0; i < productsInCart.length; i++) {
        const product = productsInCart[i];
        console.log("hi");
        const productId = product.product_id;
        const { availableQty, name } = await models.product.findOne({
          where: { id: productId },
        });
        if (availableQty > 0 && availableQty >= product.quantity) {
          counter++;
        } else {
          //Devuelva todos los productos no disponibles
          console.log("else");
          notAddedProducts.push({
            productId: productId,
            name: name,
          });
          const noBuyMessage = `Compra no realizada producto ${notAddedProducts[0].name} no disponible`;
          console.log(
            `Compra no realizada producto ${notAddedProducts[0].name} no disponible`
          );
          let check = { isValid: false, noBuyMessage };
          return check;
        }
      }
      console.log(counter);
      console.log(notAddedProducts);
      if (counter === productsInCart.length) {
        let check = { isValid: true };
        return check;
      }
    } catch (error) {
      throw error;
    }
  }
  static async buy(email) {
    try {
      // Conseguimos el cartId del usuario con este correo
      const cart = await models.user.findOne({
        where: { email: email },
      });
      const cartId = cart.id;
      // Traemos todos los productos que coincidan con el id del usuario
      const productsInCart = await models.product_in_cart.findAll({
        where: { cart_id: cartId },
      });
      const user = await models.user.findOne({
        where: { email: email },
      });
      const userId = user.id;

      // Restamos la cantidad
      for (let i = 0; i < productsInCart.length; i++) {
        const product = productsInCart[i];
        console.log("hi");
        const productId = product.product_id;
        const { availableQty, name, price, status } =
          await models.product.findOne({
            where: { id: productId },
          });
        // Cambiamos el estado del producto
        console.log(`Probando el updateState`);
        const updateState = await models.product_in_cart.update(
          {
            status: "purchased",
          },
          {
            where: { cart_id: cartId },
          }
        );
        if (availableQty > 0 && availableQty >= product.quantity) {
          // Creamos una orden de compra para cada producto
          console.log(`Probando orden`);
          const totalPrice = product.quantity * price;
          const order = await models.order.create({
            total_price: totalPrice,
            user_id: userId,
            status: "pending",
          });
          const orderId = order.id;
          // Creamos un product_in_order
          const productInOrder = await models.product_in_order.create({
            order_id: orderId,
            product_id: productId,
            quantity: product.quantity,
            price: price,
            status: "pending",
          });
          console.log(`Product in order Created`);
          const newQty = availableQty - product.quantity;
          await models.product.update(
            {
              availableQty: newQty,
            },
            {
              where: { id: productId },
            }
          );
        }
      }

      console.log(`Productos restados`);
      return productsInCart;
    } catch (error) {
      throw error;
    }
  }

  static async showOrder(email) {
    try {
      const user = await models.user.findOne({
        where: { email: email },
      });
      const userId = user.id;
      const result = await models.order.findAll({
        where: { user_id: userId },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartServices;
