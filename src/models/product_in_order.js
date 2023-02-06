const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return product_in_order.init(sequelize, DataTypes);
}

class product_in_order extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
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
      allowNull: true,
      defaultValue: "available"
    }
  }, {
    sequelize,
    tableName: 'product_in_order',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_in_order_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
