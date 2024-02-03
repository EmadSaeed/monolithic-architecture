/**
 * @swagger
 * tags:
 *   name: Basket
 *   description: API for managing user baskets
 */

/**
 * @swagger
 * definitions:
 *   BasketItem:
 *     type: object
 *     properties:
 *       productId:
 *         type: string
 *         description: The ID of the product in the basket.
 *       productName:
 *         type: string
 *         description: The name of the product in the basket.
 *       qty:
 *         type: number
 *         default: 1
 *         description: The quantity of the product in the basket.
 *       price:
 *         type: number
 *         default: 0
 *         description: The price of the product in the basket.
 *
 *   Basket:
 *     type: object
 *     properties:
 *       userId:
 *         type: string
 *         description: The ID of the user to whom the basket belongs.
 *       items:
 *         type: array
 *         items:
 *           $ref: '#/definitions/BasketItem'
 */

/**
 * @swagger
 * /basket/{userId}:
 *   get:
 *     summary: Get the basket for a specific user
 *     tags: [Basket]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The basket for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Basket'
 *       404:
 *         description: Basket not found for the user.
 */

/**
 * @swagger
 * /basket:
 *   post:
 *     summary: Create a new basket for a user
 *     tags: [Basket]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Basket'
 *     responses:
 *       201:
 *         description: The newly created basket.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Basket'
 */

/**
 * @swagger
 * /basket/{userId}:
 *   put:
 *     summary: Update the basket for a specific user
 *     tags: [Basket]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Basket'
 *     responses:
 *       200:
 *         description: The updated basket.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Basket'
 *       404:
 *         description: Basket not found for the user.
 */

/**
 * @swagger
 * /basket/{userId}:
 *   delete:
 *     summary: Delete the basket for a specific user
 *     tags: [Basket]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Basket deleted successfully.
 *       404:
 *         description: Basket not found for the user.
 */


import express from 'express';
import { getBasketByUserId, createBasket, updateBasket, deleteBasket } from '../controllers/basketController.js';

const basketRoutes = express.Router();

// Get basket by user id
basketRoutes.get("/:userId", getBasketByUserId);

// Create basket
basketRoutes.post("/", createBasket);

// Update basket
basketRoutes.put("/:userId", updateBasket);

// Delete basket
basketRoutes.delete("/:userId", deleteBasket);

export default basketRoutes;