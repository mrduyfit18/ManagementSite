const {database} = require('../DAL/loadDatabase');
const mongoose=require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Products = require('./mongooseModels/products');

exports.list = async (currentPage) => {
    const currPage = currentPage || 1;
    return await Products.paginate({}, {page: currPage, limit: 2});
}

exports.getProduct = async (id) => {
    console.log(id);
    return Products.findOne({'_id': ObjectId(id)});
}



exports.UpdateProduct = async (fields, coverLocal, id) =>{
    const fileName = coverLocal.split('\\').pop();
    const coverPath = process.env.GClOUD_IMAGE_FOlDER + fileName + '?alt=media';
    Products.updateOne({'_id':ObjectId(id)}, {'name':fields.name, 'cover':coverPath, 'manufacturer':fields.manufacturer, 'basePrice': fields.basePrice,'type': fields.type });
}

exports.AddProduct = async (fields, coverLocal) => {
    const fileName = coverLocal.split('/').pop();
    const coverPath = process.env.GClOUD_IMAGE_FOlDER + fileName + '?alt=media';
    const newProduct = {
        manufacturer: fields.manufacturer,
        name: fields.name,
        cover: coverPath,
        basePrice: fields.basePrice,
        type: fields.type
    }
    await Products.insertMany(newProduct);
}

exports.DeleteProduct = async (req) =>{
    await Products.deleteOne({'_id': ObjectId(req.params.id)});
}