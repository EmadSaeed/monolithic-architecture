import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    countInStock: { type: Number, default: 0, required: true },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;