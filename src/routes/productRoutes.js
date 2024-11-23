const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - ProductName
 *         - Price
 *         - CategoryId
 *       properties:
 *         Id:
 *           type: uuid
 *         ProductName:
 *           type: string
 *         Description:
 *           type: string
 *         Price:
 *           type: Decimal
 *         Stock:
 *           type: Int
 *         CategoryId:
 *           type: String
 *       example:
 *         Id: 00000000-0000-0000-0000-000000000000
 *         ProductName: exampleProduct
 *         Description: description
 *         Price: 1000
 *         Stock: 5
 *         CategoryId: 00000000-0000-0000-0000-000000000000
 */

/**
 * @swagger
 * /products/paged:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalProduct:
 *                   type: integer
 */
router.get('/paged', authMiddleware.verifyToken, productController.getProductPaged);

/**
 * @swagger
 * /products:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', authMiddleware.verifyToken, productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not found
 */
router.get('/:id', authMiddleware.verifyToken, productController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/', authMiddleware.verifyToken, productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not found
 */
router.put('/:id', authMiddleware.verifyToken, productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.delete('/:id', authMiddleware.verifyToken, productController.deleteProduct);

module.exports = router;