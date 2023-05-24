import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  getOrders,
  intent,
  confirm,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: APIs for order service
 */
//router.post("/:gigId", verifyToken, createOrder);

/**
 * @swagger
 * /api/orders/getOrders/:
 *   post:
 *     tags: [Orders]
 *     summary: Placing Order
 *     description: Get orders
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
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", verifyToken, getOrders);

router.post("/create-payment-intent/:id", verifyToken, intent);

/**
 * @swagger
 * /api/orders/confirm/:
 *   put:
 *     tags: [Orders]
 *     summary: Confirm Order
 *     description: Confirm Order
 *     requestBody:
 *      required: true
 *     responses:
 *       200:
 *         description: User registered successfully
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/", verifyToken, confirm);

/**
 * @swagger
 * /api/orders/updateOrderStatus/:
 *   put:
 *     tags: [Orders]
 *     summary: Update Order
 *     description: Update Order
 *     requestBody:
 *      required: true
 *     responses:
 *       200:
 *         description: Update Order
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id/status", updateOrderStatus);

export default router;
