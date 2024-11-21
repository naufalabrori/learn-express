const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - CategoryName
 *       properties:
 *         Id:
 *           type: uuid
 *         CategoryName:
 *           type: string
 *       example:
 *         Id: 00000000-0000-0000-0000-000000000000
 *         CategoryName: exampleCategory
 */

/**
 * @swagger
 * /categories/paged:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
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
 *                     $ref: '#/components/schemas/Category'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalCategory:
 *                   type: integer
 */
router.get('/paged', authMiddleware.verifyToken, categoryController.getCategoryPaged);

/**
 * @swagger
 * /categories:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', authMiddleware.verifyToken, categoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
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
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Not found
 */
router.get('/:id', authMiddleware.verifyToken, categoryController.getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
router.post('/', authMiddleware.verifyToken, categoryController.createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Not found
 */
router.put('/:id', authMiddleware.verifyToken, categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Categories]
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
router.delete('/:id', authMiddleware.verifyToken, categoryController.deleteCategory);

module.exports = router;