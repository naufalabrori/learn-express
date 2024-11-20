const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Email
 *         - Username
 *         - Password
 *         - RoleId
 *       properties:
 *         Id:
 *           type: uuid
 *           description: ID user
 *         Email:
 *           type: string
 *           description: Email user
 *         Username:
 *           type: string
 *           description: Username user
 *         Password:
 *           type: string
 *           description: password user
 *         PhoneNumber:
 *           type: string
 *           description: PhoneNumber user
 *         RoleId:
 *           type: string
 *           description: Role user
 *       example:
 *         Id: 00000000-0000-0000-0000-000000000000
 *         Email: user@example.com
 *         Username: exampleUser
 *         Password: password
 *         PhoneNumber: "081234567890"
 *         RoleId: 00000000-0000-0000-0000-000000000000
 */

/**
 * @swagger
 * /users/paged:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
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
 *         description: Daftar user berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalUsers:
 *                   type: integer
 */
router.get('/paged', authMiddleware.verifyToken, userController.getUserPaged);

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Daftar user berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', authMiddleware.verifyToken, userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data user berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User tidak ditemukan
 */
router.get('/:id', authMiddleware.verifyToken, userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User tidak ditemukan
 */
router.put('/:id', authMiddleware.verifyToken, userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *       404:
 *         description: User tidak ditemukan
 */
router.delete('/:id', authMiddleware.verifyToken, userController.deleteUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             Username: "username"
 *             Password: "password"
 *     responses:
 *       201:
 *         description: Login berhasil
 */
router.post('/login', userController.login);

module.exports = router;
