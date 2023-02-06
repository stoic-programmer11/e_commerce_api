const { Router } = require("express");
const { create, show } = require("../controllers/procuct.controller");

const router = Router();

/**
 * @openapi
 * /api/v1/products/create:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       description: Required fields to create a new product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/create'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: product created
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
 * /api/v1/products/show:
 *   get:
 *     summary: Shows the products whose quantity is greater than 0
 *     tags:
 *       - Products
 *     requestBody:
 *       required: false
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
 *         description: No products available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No products available
 */

// Create Products
router.post("/create", create);

// Show Products
router.get("/show", show);

module.exports = router;
