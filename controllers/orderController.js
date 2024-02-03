import orderModel from '../models/orderModel.js';

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate('user', 'id name');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// Get order by id
const getOrderById = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id).populate('user', 'name email');
        if (order) {
            res.json(order);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create new order
const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: 'No order items' });
            return;
        } else {
            const order = new orderModel({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update order to paid
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);

        if (order) {
            await order.remove();
            res.json({ message: 'Order removed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export { getAllOrders, getOrderById, addOrderItems, updateOrderToPaid, deleteOrder };