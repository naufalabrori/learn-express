const express = require('express');
const router = express.Router();
const orderDetailController = require("../controllers/orderDetailController");
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderDetail:
 *       type: object
 *       required:
 *         - OrderId
 *         - ProductId
 *         - Quantity
 *         - Price
 *       properties:
 *         Id:
 *           type: uuid
 *         OrderId:
 *           type: string
 *         ProductId:
 *           type: string
 *         Quantity:
 *           type: Int
 *         Price:
 *           type: Decimal
 *       example:
 *         Id: 00000000-0000-0000-0000-000000000000
 *         OrderId: 00000000-0000-0000-0000-000000000000
 *         ProductId: 00000000-0000-0000-0000-000000000000
 *         Quantity: 2
 *         Price: 50000
 */

/**
 * @swagger
 * /orderDetails/paged:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [OrderDetails]
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
 *                     $ref: '#/components/schemas/OrderDetail'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalOrderDetail:
 *                   type: integer
 */
router.get('/paged', authMiddleware.verifyToken, orderDetailController.getOrderDetailPaged);

/**
 * @swagger
 * /orderDetails:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [OrderDetails]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderDetail'
 */
router.get('/', authMiddleware.verifyToken, orderDetailController.getAllOrderDetails);

/**
 * @swagger
 * /orderDetails/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [OrderDetails]
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
 *               $ref: '#/components/schemas/OrderDetail'
 *       404:
 *         description: Not found
 */
router.get('/:id', authMiddleware.verifyToken, orderDetailController.getOrderDetailById);

/**
 * @swagger
 * /orderDetails:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [OrderDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDetail'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 */
router.post('/', authMiddleware.verifyToken, orderDetailController.createOrderDetail);

/**
 * @swagger
 * /orderDetails/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: [OrderDetails]
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
 *             $ref: '#/components/schemas/OrderDetail'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 *       404:
 *         description: Not found
 */
router.put('/:id', authMiddleware.verifyToken, orderDetailController.updateOrderDetail);

/**
 * @swagger
 * /orderDetails/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [OrderDetails]
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
router.delete('/:id', authMiddleware.verifyToken, orderDetailController.deleteOrderDetail);

module.exports = router;