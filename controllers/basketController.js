import basketModel from "../models/basketModel.js";

// Get basket by user id
const getBasketByUserId = async (req, res) => {
    try {
        const basket = await basketModel.findOne({ userId: req.params.userId });
        res.json(basket);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Create basket
const createBasket = async (req, res) => {
    try {
        const basket = new basketModel({
            userId: req.body.userId,
            items: req.body.items,
        });
        const newBasket = await basket.save();
        res.status(201).json(newBasket);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Update basket
const updateBasket = async (req, res) => {
    try {
        const basket = await basketModel.findOne({ userId: req.params.userId });
        if (basket) {
            basket.items = req.body.items;

            const updatedBasket = await basket.save();
            res.json(updatedBasket);
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Delete basket
const deleteBasket = async (req, res) => {
    try {
        const basket = await basketModel.findOne({ userId: req.params.userId });
        if (basket) {
            await basket.remove();
            res.json({ message: "Basket removed" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export { getBasketByUserId, createBasket, updateBasket, deleteBasket };