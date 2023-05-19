import express from "express";
import { deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: APIs for Users Functionality
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a User
 *     description: Delete a User
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: User Id Required
 *          schema:
 *           type: string
 *           format: objectId
 *
 *     responses:
 *       200:
 *         description: User Delete Successfully
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.delete("/:id", verifyToken, deleteUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get User
 *     description: Get User
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: User Id Required
 *          schema:
 *           type: string
 *           format: objectId
 *
 *     responses:
 *       200:
 *         description:
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", getUser);

export default router;
