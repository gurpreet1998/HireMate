import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Signin-Signup Name
 *   description: APIs for user signin and signup functionality
 */

/**
 * @swagger
 * /api/auth/register/:
 *   post:
 *     tags: [Signin-Signup Name]
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
 *     tags: [Signin-Signup Name]
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

// /**
//  * @swagger
//  * /api/logout:
//  *   post:
//  *     summary: User logout
//  *     tags: [Signin-Signup Name]
//  *     description: Log out a user.
//  *     responses:
//  *       200:
//  *         description: User logged out successfully
//  *       401:
//  *         description: Unauthorized
//  *       500:
//  *         description: Internal server error
//  */
router.post("/logout", logout);

export default router;
