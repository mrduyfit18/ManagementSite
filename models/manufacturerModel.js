const {database} = require('../DAL/loadDatabase');
const mongoose=require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Manufacturers = require('./mongooseModels/manufacturers');

exports.list = async (filter, currentPage) => {
    return Manufacturers.find({});
}