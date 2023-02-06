const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return product_in_cart.init(sequelize, DataTypes);
}

/**
 * @openapi
 * components:
 *   schemas:
 *     showProductsInCart:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: simonchumacero26@gmail.com
 *     addToCart:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: simonchumacero26@gmail.com
 *         productId:
 *           type: integer
 *           example: 1
 *         quantity:
 *           type: integer
 *           example: 2
 *     buyCart:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: simonchumacero26@gmail.com
 */

class product_in_cart extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cart',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("available","not_available","complete","pending","purchased"),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product_in_cart',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_in_cart_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
