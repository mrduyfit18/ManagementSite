const {database} = require('../DAL/loadDatabase');
const mongoose=require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const orders = require('./mongooseModels/orders');
const details = require('./mongooseModels/orderDetails');
const contacts = require('./mongooseModels/contacts');






exports.getOrdersOfUser = async (userID) => {
    return orders.find({'user_id': ObjectId(userID), 'status': {'$ne': 'cart'}}).populate({
        path : 'listProducts',
        populate : {
            path : 'productID'
        }
    });
}


exports.getOrder= async (id) => {
    return orders.findById(ObjectId(id)).populate('user_id').populate('contact_id').populate({
        path : 'listProducts',
        populate : {
            path : 'productID',
        }
    });
}

exports.getAllOrders= async () => {
    return orders.find({'status': {'$ne': 'cart'}});
}

exports.updateStatus= async (orderID, status) => {
    await orders.findByIdAndUpdate(ObjectId(orderID), {'$set': {'status': status}});
}

