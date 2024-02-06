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
        const order = new orderModel({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            user: req.body.user,
            isPaid: req.body.isPaid,
            paidAt: req.body.paidAt,
            isDelivered: req.body.isDelivered,
            deliveredAt: req.body.deliveredAt,
        });

        if (order.orderItems && order.orderItems.length === 0) {
            res.status(400).json({ message: 'No order items' });
            return;
        } else {
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
                id: req.params.id
            }

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
            await order.deleteOne();
            res.json({ message: 'Order removed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export { getAllOrders, getOrderById, addOrderItems, updateOrderToPaid, deleteOrder };