const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return product.init(sequelize, DataTypes);
}

/**
 * @openapi
 * components:
 *   schemas:
 *     create:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Game Boy Advance
 *         price:
 *          type: float
 *          example: 80
 *         availableQty:
 *           type: integer
 *           example: 8
 *         image_url:
 *          type: string
 *          example: http://GBA
 *         status:
 *           type: string
 *           example: available
 *         user_id:
 *           type: integer
 *           example: 1
 */

class product extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    availableQty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("available","not_available","complete","pending","purchased"),
      allowNull: true,
      defaultValue: "not_available"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
