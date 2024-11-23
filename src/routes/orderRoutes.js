const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - UserId
 *         - TotalAmount
 *         - OrderStatus
 *       properties:
 *         Id:
 *           type: uuid
 *         UserId:
 *           type: string
 *         OrderDate:
 *           type: string
 *         TotalAmount:
 *           type: Decimal
 *         OrderStatus:
 *           type: String
 *       example:
 *         Id: 00000000-0000-0000-0000-000000000000
 *         UserId: 00000000-0000-0000-0000-000000000000
 *         OrderDate: 2024-01-01T17:00:00.000Z
 *         TotalAmount: 1000
 *         OrderStatus: Pending
 */

/**
 * @swagger
 * /orders/paged:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
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
 *                     $ref: '#/components/schemas/Order'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalOrder:
 *                   type: integer
 */
router.get('/paged', authMiddleware.verifyToken, orderController.getOrderPaged);

/**
 * @swagger
 * /orders:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', authMiddleware.verifyToken, orderController.getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
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
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Not found
 */
router.get('/:id', authMiddleware.verifyToken, orderController.getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.post('/', authMiddleware.verifyToken, orderController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
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
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Not found
 */
router.put('/:id', authMiddleware.verifyToken, orderController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
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
router.delete('/:id', authMiddleware.verifyToken, orderController.deleteOrder);

module.exports = router;