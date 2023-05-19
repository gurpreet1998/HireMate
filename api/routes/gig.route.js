import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Gigs
 *   description: APIs for Gigs Functionality
 */

/**
 * @swagger
 * /api/gigs/:
 *   post:
 *     tags: [Gigs]
 *     summary: Adding a Gig
 *     description: Add a new Gig
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/gigModel'
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
router.post("/", verifyToken, createGig);

/**
 * @swagger
 * /api/gigs/{id}:
 *   delete:
 *     tags: [Gigs]
 *     summary: Delete a Gig
 *     description: Delete a Gig
 *     parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Gig Id Required
 *          schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: Gig deleted successfully
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
router.delete("/:id", verifyToken, deleteGig);

/**
 * @swagger
 * /api/gigs/single/{id}:
 *   get:
 *     tags: [Gigs]
 *     summary: Get Gig
 *     description: Get Gig
 *     parameters:
 *        - in: path
 *          name: id
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
router.get("/single/:id", getGig);

/**
 * @swagger
 * /api/gigs:
 *   get:
 *     tags: [Gigs]
 *     summary: Get all Gigs
 *     description: Get all Gigs
 *
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
router.get("/", getGigs);

export default router;
