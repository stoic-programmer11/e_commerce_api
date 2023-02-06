const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return order.init(sequelize, DataTypes);
}

/**
 * @openapi
 * components:
 *   schemas:
 *     showAllOrders:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: simonchumacero26@gmail.com
 */

class order extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM("available","not_available","complete","pending","purchased"),
      allowNull: true,
      defaultValue: "pending"
    }
  }, {
    sequelize,
    tableName: 'order',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "order_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
