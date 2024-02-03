import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: { type: String, required: true },
            productName: { type: String, required: true },
            qty: { type: Number, default: 1, required: true },
            price: { type: Number, default: 0, required: true },
        },
    ],
});

const basketModel = mongoose.model("Basket", basketSchema);

export default basketModel;