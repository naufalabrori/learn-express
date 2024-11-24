const express = require('express');
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - UserId
 *         - ProductId
 *         - Rating
 *       properties:
 *         Id:
 *           type: uuid
 *         UserId:
 *           type: string
 *         ProductId:
 *           type: string
 *         Rating:
 *           type: Decimal
 *         Stock:
 *           type: Int
 *         CategoryId:
 *           type: String
 *       example:
 *         Id: 00000000-0000-0000-0000-000000000000
 *         UserId: 00000000-0000-0000-0000-000000000000
 *         ProductId: 00000000-0000-0000-0000-000000000000
 *         Rating: 5
 */

/**
 * @swagger
 * /reviews/paged:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Reviews]
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
 *                     $ref: '#/components/schemas/Review'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalReview:
 *                   type: integer
 */
router.get('/paged', authMiddleware.verifyToken, reviewController.getReviewPaged);

/**
 * @swagger
 * /reviews:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get('/', authMiddleware.verifyToken, reviewController.getAllReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Reviews]
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
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Not found
 */
router.get('/:id', authMiddleware.verifyToken, reviewController.getReviewById);

/**
 * @swagger
 * /reviews:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.post('/', authMiddleware.verifyToken, reviewController.createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: [Reviews]
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
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Not found
 */
router.put('/:id', authMiddleware.verifyToken, reviewController.updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Reviews]
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
router.delete('/:id', authMiddleware.verifyToken, reviewController.deleteReview);

module.exports = router;