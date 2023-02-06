const DataTypes = require("sequelize").DataTypes;
const _cart = require("./cart");
const _order = require("./order");
const _product = require("./product");
const _product_in_cart = require("./product_in_cart");
const _product_in_order = require("./product_in_order");
const _user = require("./user");

function initModels(sequelize) {
  const user = _user(sequelize, DataTypes);
  const cart = _cart(sequelize, DataTypes);
  const order = _order(sequelize, DataTypes);
  const product = _product(sequelize, DataTypes);
  const product_in_cart = _product_in_cart(sequelize, DataTypes);
  const product_in_order = _product_in_order(sequelize, DataTypes);


  product_in_cart.belongsTo(cart, { as: "cart", foreignKey: "cart_id"});
  cart.hasMany(product_in_cart, { as: "product_in_carts", foreignKey: "cart_id"});
  product_in_order.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(product_in_order, { as: "product_in_orders", foreignKey: "order_id"});
  product_in_cart.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(product_in_cart, { as: "product_in_carts", foreignKey: "product_id"});
  product_in_order.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(product_in_order, { as: "product_in_orders", foreignKey: "product_id"});
  cart.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(cart, { as: "carts", foreignKey: "user_id"});
  order.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order, { as: "orders", foreignKey: "user_id"});
  product.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(product, { as: "products", foreignKey: "user_id"});

  return {
    cart,
    order,
    product,
    product_in_cart,
    product_in_order,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
