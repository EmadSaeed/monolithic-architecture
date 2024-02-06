import productModel from "../models/productModel.js";

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Get product by id
const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Create product
const createProduct = async (req, res) => {
    try {
        const product = new productModel({
            productName: req.body.productName,
            description: req.body.description,
            category: req.body.category,
            brand: req.body.brand,
            image: req.body.image,
            price: req.body.price,
            countInStock: req.body.countInStock
        });

        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Update product
const updateProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (product) {
            product.productName = req.body.productName;
            product.description = req.body.description;
            product.category = req.body.category;
            product.brand = req.body.brand;
            product.image = req.body.image;
            product.price = req.body.price;
            product.countInStock = req.body.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: "Product removed" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };