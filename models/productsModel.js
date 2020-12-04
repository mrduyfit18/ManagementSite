const {database} = require('../DAL/loadDatabase');
const mongoose=require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Products = require('./mongooseModels/products');

exports.list = async () => {
    return Products.find({});
}

exports.getProduct = async (id) => {
    console.log(id);
    return Products.findOne({'_id': ObjectId(id)});
}



exports.UpdateProduct = async (req) =>{
    await Products.updateOne({'_id': ObjectId(req.params.id)},{$set: {name: req.body.name}});
}

exports.AddProduct = async (req) =>{
    const newProduct = {
        manufacturer: req.body.manufacturer,
        name: req.body.name,
        cover: req.body.cover,
        basePrice: req.body.basePrice,
        type: req.body.type
    }
    await Products.insertMany(newProduct);
}

exports.DeleteProduct = async (req) =>{
    await Products.deleteOne({'_id': ObjectId(req.params.id)});
}