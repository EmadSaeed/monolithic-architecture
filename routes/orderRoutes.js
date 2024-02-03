/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * definitions:
 *   OrderItem:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: The name of the ordered item.
 *       qty:
 *         type: number
 *         description: The quantity of the ordered item.
 *       price:
 *         type: number
 *         description: The price of the ordered item.
 *       product:
 *         type: string
 *         description: The ID of the product in the order.
 *
 *   ShippingAddress:
 *     type: object
 *     properties:
 *       fullName:
 *         type: string
 *         description: The full name of the recipient.
 *       address:
 *         type: string
 *         description: The shipping address.
 *       city:
 *         type: string
 *         description: The city for shipping.
 *       postCode:
 *         type: string
 *         description: The postal code for shipping.
 *       country:
 *         type: string
 *         description: The country for shipping.
 *
 *   Order:
 *     type: object
 *     properties:
 *       orderItems:
 *         type: array
 *         items:
 *           $ref: '#/definitions/OrderItem'
 *       shippingAddress:
 *         $ref: '#/definitions/ShippingAddress'
 *       paymentMethod:
 *         type: string
 *         description: The payment method for the order.
 *       itemsPrice:
 *         type: number
 *         description: The total price of all items in the order.
 *       shippingPrice:
 *         type: number
 *         description: The shipping cost.
 *       totalPrice:
 *         type: number
 *         description: The total cost of the order.
 *       user:
 *         type: string
 *         description: The ID of the user placing the order.
 *       isPaid:
 *         type: boolean
 *         description: Indicates if the order is paid.
 *       paidAt:
 *         type: string
 *         format: date-time
 *         description: The date and time when the order was paid.
 *       isDelivered:
 *         type: boolean
 *         description: Indicates if the order is delivered.
 *       deliveredAt:
 *         type: string
 *         format: date-time
 *         description: The date and time when the order was delivered.
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Order'
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The order with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 *       404:
 *         description: Order not found.
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Order'
 *     responses:
 *       201:
 *         description: The newly created order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 */

/**
 * @swagger
 * /orders/{id}/pay:
 *   put:
 *     summary: Update an order to paid
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Order'
 *       404:
 *         description: Order not found.
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Order deleted successfully.
 *       404:
 *         description: Order not found.
 */

import express from "express";
import { getAllOrders, getOrderById, addOrderItems, updateOrderToPaid, deleteOrder } from "../controllers/orderController.js";

const orderRouts = express.Router();

// Get All Orders
orderRouts.get('/', getAllOrders);

// Get Single Order
orderRouts.get('/:id', getOrderById);

// Create Order
orderRouts.post('/', addOrderItems);

// Update Order to Paid
orderRouts.put('/:id/pay', updateOrderToPaid);

// Delete Order
orderRouts.delete('/:id', deleteOrder);

export default orderRouts;