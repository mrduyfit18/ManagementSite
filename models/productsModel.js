const {database} = require('../DAL/loadDatabase');
const mongoose=require('mongoose');
const path = require('path');
const ObjectId = mongoose.Types.ObjectId;

const Products = require('./mongooseModels/products');
const Manufacturers = require('./mongooseModels/manufacturers');
const productImage = require('./mongooseModels/productImages');

exports.list = async (filter,currentPage) => {
    const currPage = currentPage || 1;
    return await Products.paginate( filter, {page: currPage, limit: 5, populate:  'manufacturer_id'});
}

exports.getProduct = async (id) => {
    const product = await Products.findOne({'_id': ObjectId(id)}).populate('manufacturer_id');
    product.productImages = await productImage.find({'product_id': ObjectId(id)});
    return product;
}



exports.UpdateProduct = async (fields, coverLocal, id) =>{
    let fileName;
    if(coverLocal !== '') {
        fileName = coverLocal.split(path.sep).pop();
    }
    const newProduct = {
        manufacturer_id: ObjectId(fields.manufacturer),
        name: fields.name,
        basePrice: fields.basePrice,
        type: fields.type,
        shortSpecs: {
            shortCPU: fields.shortCPU,
            shortDisplay: fields.shortDisplay,
            shortOS: fields.shortOS
        },
        OS: fields.OS,
        display: fields.display,
        processor: fields.processor,
        memory: fields.memory,
        storage: fields.storage,
        graphics: fields.graphics,
        ethernet: fields.ethernet,
        wireless: fields.wireless,
        audio: fields.audio,
        power: fields.power,
        slogan: fields.slogan

    }
    const coverPath = await process.env.GClOUD_PRODUCT_FOlDER + fileName + '?alt=media';
    let product = await Products.findOneAndUpdate({'_id': id}, newProduct);
    const oldImagePath = product.cover;
    if(fileName !== undefined){
        await Products.updateOne({'_id': id},{'cover': coverPath});
        return oldImagePath;
    }
    else{
    }
}

exports.AddProduct = async (fields, images, coverLocal) => {
    const fileName = coverLocal.split('/').pop();
    const coverPath = process.env.GClOUD_PRODUCT_FOlDER + fileName + '?alt=media';
    const newProduct = {
        manufacturer_id: ObjectId(fields.manufacturer),
        name: fields.name,
        cover: coverPath,
        basePrice: fields.basePrice,
        type: fields.type,
        shortSpecs: {
            shortCPU: fields.shortCPU,
            shortDisplay: fields.shortDisplay,
            shortOS: fields.shortOS
        },
        OS: fields.OS,
        display: fields.display,
        processor: fields.processor,
        memory: fields.memory,
        storage: fields.storage,
        graphics: fields.graphics,
        ethernet: fields.ethernet,
        wireless: fields.wireless,
        audio: fields.audio,
        power: fields.power,
        slogan: fields.slogan,
        state: 'active'

    }
    const product = await Products.create(newProduct);
    let productImages = [];
    for(let file of images){
        const imageName = file.split(path.sep).pop();
        const newPath = process.env.GClOUD_PRODUCT_FOlDER + imageName + '?alt=media';
        const image = {
            product_id: product._id,
            path: newPath
        }
        await productImages.push(image);
    }
    await productImage.insertMany(productImages);
}

exports.DeleteProduct = async (productID) =>{
    await Products.updateOne({'_id': ObjectId(productID)}, {'state': 'hide'});
}

exports.EnableProduct = async (productID) =>{
    await Products.updateOne({'_id': ObjectId(productID)}, {'state': 'active'});
}