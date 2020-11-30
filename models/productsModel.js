const {database} = require('../DAL/loadDatabase');
const ObjectId = require('mongodb').ObjectId;
let listProducts;

exports.Init = async () => {
    listProducts = await db.Connect();
}


exports.list = async () => {
    const collection = await database().collection('Products');
    let result =  await collection.find({});
    return await result.toArray().then();
}

exports.getProduct = async (id) => {
    const collection = database().collection('Products');
    if(id.length > 11){
        return  await collection.findOne({'_id': ObjectId(id)});
    }
}

exports.getProductByType = async (type, number) =>{
    const collection = database().collection('Products');
    let result =  await collection.find({'type': type}).limit(number);
    return await result.toArray().then();
}

exports.UpdateProduct = async (req) =>{
    const collection = await database().collection('Products');
    await collection.updateOne({'_id': ObjectId(req.params.id)},{$set: {name: req.body.name}});
}

exports.AddProduct = async (req) =>{
    const newProduct = {
        manufacturer: req.body.manufacturer,
        name: req.body.name,
        cover: req.body.cover,
        basePrice: req.body.basePrice,
        type: req.body.type
    }
    const collection = await database().collection('Products');
    await collection.insertOne(newProduct);
}

exports.DeleteProduct = async (req) =>{
    const collection = await database().collection('Products');
    await collection.deleteOne({'_id': ObjectId(req.params.id)});
}