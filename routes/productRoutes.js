/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       productName:
 *         type: string
 *         description: The name of the product.
 *       description:
 *         type: string
 *         description: A short description of the product.
 *       category:
 *         type: string
 *         description: The category to which the product belongs.
 *       brand:
 *         type: string
 *         description: The brand of the product.
 *       image:
 *         type: string
 *         description: URL of the product image.
 *       price:
 *         type: number
 *         description: The price of the product.
 *       countInStock:
 *         type: number
 *         description: The available stock count of the product.
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Product'
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The product with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       404:
 *         description: Product not found.
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *         description: The newly created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: The updated product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       404:
 *         description: Product not found.
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 */


import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const productRoutes = express.Router();

// Get All Products
productRoutes.get('/', getAllProducts);

// Get Single Product
productRoutes.get('/:id', getProductById);

// Create Product
productRoutes.post('/', createProduct);

// Update Product
productRoutes.put('/:id', updateProduct);

// Delete Product
productRoutes.delete('/:id', deleteProduct);

export default productRoutes;