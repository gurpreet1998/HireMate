import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: APIs for Message service
 */

/**
 * @swagger
 * /api/messages/createMessage/:
 *   post:
 *     tags: [Messages]
 *     summary: Create Nessage
 *     description: Create Nessage
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: Message Send Successfully
 *
 */

router.post("/", verifyToken, createMessage);

/**
 * @swagger
 * /api/messages/getMessages/:
 *   get:
 *     tags: [Messages]
 *     summary: Get Nessages
 *     description: Get Nessages
 *     requestBody:
 *      required: true
 *
 */
router.get("/:id", verifyToken, getMessages);

export default router;
