import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: APIs for Customers' Review Functionality
 */

/**
 * @swagger
 * /api/reviews/:
 *   post:
 *     tags: [Reviews]
 *     summary: Adding a new Review to a Gig
 *     description: Adding a new Review to a Gig
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/reviewModel'
 *     responses:
 *       200:
 *         description: Review added successfully
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
router.post("/", verifyToken, createReview);

/**
 * @swagger
 * /api/reviews/{gigId}:
 *   get:
 *     tags: [Reviews]
 *     summary: Get all Reviews for a Gig
 *     description: Get all Reviews for a Gig
 *     parameters:
 *        - in: path
 *          name: gigId
 *          required: true
 *          description: Gig Id Required
 *          schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: Successful
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
router.get("/:gigId", getReviews);

/**
 * @swagger
 * /api/reviews/{gigId}:
 *   delete:
 *     tags: [Reviews]
 *     summary: Delete review from a Gig
 *     description: Delete review from a Gig
 *     parameters:
 *        - in: path
 *          name: gigId
 *          required: true
 *          description: Gig Id Required
 *          schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: Review deleted successfully
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
router.delete("/:id", deleteReview);

export default router;
