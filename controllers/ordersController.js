const orderServices = require('../models/orderServices');



exports.index = async (req, res, next) => {
    const filter = {'status': {'$ne': 'cart'}};
    const orders = await orderServices.getAllOrders(filter);
    res.render('orders/index', {orders});
}

exports.detail = async (req, res, next) => {
    const orderID = req.params.id;
    const order = await orderServices.getOrder(orderID);
    res.render('orders/detail', {order});
}

exports.update = async (req, res, next) => {
    const orderID = req.params.id;
    const status = req.body.status;
    await orderServices.updateStatus(orderID, status);
    res.send('1');
}

