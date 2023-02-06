const { Router } = require("express");
const {
  showProductsInCart,
  addProductsToCart,
  buyProductsInCart,
  showAllOrders,
} = require("../controllers/cart.controller");

const router = Router();

/**
 * @openapi
 * /api/v1/cart/show/:
 *   post:
 *     summary: Shows all the products that the user has in their cart
 *     tags:
 *       - Cart
 *     requestBody:
 *       description: Required show all products in cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/showProductsInCart'
 *     responses:
 *       200:
 *         description: Successful request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successful request
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The user has no products in his cart
 * /api/v1/cart/add/:
 *   post:
 *     summary: Add a product to cart
 *     tags:
 *       - Cart
 *     requestBody:
 *       description: Required fields to add a product to cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addToCart'
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added to cart successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error
 * /api/v1/cart/buy/:
 *   post:
 *     summary: Buy all products in cart
 *     tags:
 *       - Cart
 *     requestBody:
 *       description: Required fields to buy all products in cart
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/buyCart'
 *     responses:
 *       200:
 *         description: Products in the cart successfully purchased
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Products in the cart successfully purchased
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error
 * /api/v1/cart/order/show:
 *   post:
 *     summary: Shows all orders of a user
 *     tags:
 *       - Cart
 *     requestBody:
 *       description: Required fields to show all orders of a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/showAllOrders'
 *     responses:
 *       200:
 *         description: Successful request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successful request
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error
 */

// Show products in cart
router.post("/show", showProductsInCart);

// Add products to cart
router.post("/add", addProductsToCart);

// Buy products in cart
router.post("/buy", buyProductsInCart);

// Show all orders of a user
router.post("/order/show", showAllOrders);

module.exports = router;
