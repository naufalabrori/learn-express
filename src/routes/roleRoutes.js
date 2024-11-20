const express = require('express');
const router = express.Router();
const roleController = require("../controllers/roleController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - Rolename
 *       properties:
 *         Id:
 *           type: uuid
 *           description: ID Role
 *         Rolename:
 *           type: string
 *           description: Rolename Role
 *       example:
 *         Id: 00000000-0000-0000-0000-000000000000
 *         Rolename: exampleRole
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Role berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 */
router.post('/', authMiddleware.verifyToken, roleController.createRole);

/**
 * @swagger
 * /roles:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List Role berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
router.get('/', authMiddleware.verifyToken, roleController.getAllRole);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data Role berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role tidak ditemukan
 */
router.get('/:id', authMiddleware.verifyToken, roleController.getRoleById);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: [Roles]
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
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Role berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role tidak ditemukan
 */
router.put('/:id', authMiddleware.verifyToken, roleController.updateRole);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags: [Roles]
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
router.delete('/:id', authMiddleware.verifyToken, roleController.deleteRole);

module.exports = router;