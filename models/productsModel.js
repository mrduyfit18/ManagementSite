const {database} = require('../DAL/loadDatabase');
const ObjectId = require('mongodb').ObjectId;
//let listProducts;

// exports.Init = async () => {
//     listProducts = await db.Connect();
// }


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