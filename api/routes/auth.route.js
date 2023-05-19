import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Signin-Signup
 *   description: APIs for user signin and signup functionality
 */

/**
 * @swagger
 * /api/auth/register/:
 *   post:
 *     tags: [User Signin-Signup]
 *     summary: User registration
 *     description: Register a new user.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: User registered successfully
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

router.post("/register", register);

/**
 * @swagger
 * /api/auth/login/:
 *   post:
 *     tags: [User Signin-Signup]
 *     summary: User Login
 *     description: Login existing User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User registered successfully
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
router.post("/login", login);

/**
 * @swagger
 * /api/auth/logout/:
 *   post:
 *     tags: [User Signin-Signup]
 *     summary: User Logout
 *     description: Logout User
 *     responses:
 *       200:
 *         description: User registered successfully
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
router.post("/logout", logout);

export default router;
