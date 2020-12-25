const {database} = require('../DAL/loadDatabase');
const mongoose=require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Products = require('./mongooseModels/products');
const Manufacturers = require('./mongooseModels/manufacturers');
const productImage = require('./mongooseModels/productImages');

exports.list = async (filter,currentPage) => {
    const currPage = currentPage || 1;
    return await Products.paginate( filter, {page: currPage, limit: 10, populate:  'manufacturer_id'});
}

exports.getProduct = async (id) => {
    console.log(id);
    return Products.findOne({'_id': ObjectId(id)}).populate('manufacturer_id');
}



exports.UpdateProduct = async (fields, coverLocal, id) =>{
    let fileName;
    if(coverLocal) {
        fileName = await coverLocal.split('/').pop();
        fileName = await fileName.split('\\').pop();
    }
    const coverPath = await process.env.GClOUD_IMAGE_FOlDER + fileName + '?alt=media';
    await Products.updateOne({'_id':ObjectId(id)}, {name:fields.name, manufacturer:fields.manufacturer, basePrice: fields.basePrice,type: fields.type });
    if(fileName !==undefined){
        await Products.updateOne({'_id':ObjectId(id)}, {cover: coverPath });
    }
}

exports.AddProduct = async (fields, images, coverLocal) => {
    const fileName = coverLocal.split('/').pop();
    const coverPath = process.env.GClOUD_IMAGE_FOlDER + fileName + '?alt=media';
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
    let image;
    await Products.insertMany(newProduct);
    const product = await Products.findOne({'cover': coverPath});
    for(let file of images){
        const imageName = file.split('/').pop();
        const newPath = process.env.GClOUD_IMAGE_FOlDER + imageName + '?alt=media';
        image = {
            product_id: product._id,
            path: newPath
        }
        await productImage.insertMany(image);
    }
}

exports.DeleteProduct = async (req) =>{
    await Products.deleteOne({'_id': ObjectId(req.params.id)});
}