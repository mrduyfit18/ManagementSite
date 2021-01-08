const formidable = require('formidable');
const fs = require('fs');
const imageService = require('../services/images');
const productsModel = require('../models/productsModel');
const manufacturerModel = require('../models/manufacturerModel');
const path = require('path');


exports.add = async (req, res, next) => {
    const Manufacturers =  await manufacturerModel.list();
    res.render('products/add', {Manufacturers});
}

exports.SaveProduct =  async (req, res, next) => {
    const form = formidable({ multiples: true });
    let newPath = [];
    let coverPath;
    await form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        if(files.cover.name && files.cover.type.includes('image') && files.cover.size>0) {
            //cover
            const res = files.cover.name.split('.').pop();
            coverPath = files.cover.path + '.' + res;
            await fs.rename(files.cover.path, coverPath, () => {});
            await imageService.uploadImage(coverPath, files.cover, 'products/').then();

            //list pics
            for(let file of files.productImages){
                const res = file.name.split('.').pop();
                newPath.push(file.path + '.' + res);
                await fs.rename(file.path, newPath[newPath.length - 1],  () => {});
                await imageService.uploadImage(newPath[newPath.length - 1], file, 'products/');
            }
        }
        await productsModel.AddProduct(fields, newPath, coverPath).then(res.redirect('/'));
    });
}

exports.edit =  async (req, res, next) => {
    const Product = await productsModel.getProduct(req.query.id);
    const Manufacturers =  await manufacturerModel.list();
    res.render('products/edit', { Product, Manufacturers});
}

exports.SaveUpdate =  async (req, res, next) => {
    const form = formidable({ multiples: true });
    let newPath = '';
    await form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        if(files.cover.name && files.cover.type.includes('image') && files.cover.size>0) {
            if(files.cover.name !=='') {
                const res = files.cover.name.split('.').pop();
                newPath = files.cover.path + '.' + res;
                fs.rename(files.cover.path, newPath, () => {
                    imageService.uploadImage(newPath, files.cover).then();
                });
            }
        }
        const oldImagePath = await productsModel.UpdateProduct(fields, newPath, req.params.id).then(res.redirect('/'));
        if(oldImagePath) {
            await imageService.deleteImage(oldImagePath);
        }
    });
}

exports.delete = async (req, res, next) => {
    const productID = req.query.id;
    await productsModel.DeleteProduct(productID);
    res.redirect('/products');
}

exports.enable = async (req, res, next) => {
    const productID = req.query.id;
    await productsModel.EnableProduct(productID);
    res.redirect('/products');
}
exports.index = async (req, res, next) => {
    // Get products from model
    const currentPage = req.query.page;
    const option = req.query.type || '';
    let Desktopscheck, Allcheck, Laptopscheck, Tabletscheck, Hybridscheck;

    switch(option){
        case 'Desktops':
            Desktopscheck = 1;
            break;
        case 'Laptops':
            Laptopscheck = 1;
            break;
        case 'Tablets':
            Tabletscheck = 1;
            break;
        case 'Hybrids':
            Hybridscheck = 1;
            break;
        default:
            Allcheck = 1;
            break;
    }
    const name = req.query.name || '';
    const pagination = await productsModel.list(req.query ? {'type': { "$regex": option, "$options": "i" } , 'name': { "$regex": name, "$options": "i" } }:{} ,currentPage);
    const Products = pagination.docs;
    const nextPage = pagination.nextPage;
    const prevPage = pagination.prevPage;
    const page = pagination.page;
    // Pass data to view to display list of products
    res.render('products/allProducts', { Products, nextPage, prevPage, page, Desktopscheck, Laptopscheck, Tabletscheck, Hybridscheck, Allcheck});
};

exports.addManufacturer = async (req, res, next) => {

    const form = formidable({ multiples: true });
    await form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        if(files.manufacturerLogo.name && files.manufacturerLogo.type.includes('image') && files.manufacturerLogo.size>0) {
            //logo
            const result = files.manufacturerLogo.name.split('.').pop();
            //const coverPath = files.manufacturerLogo.path + '.' + result;
            const coverPath = path.dirname(files.manufacturerLogo.path) + '/' + files.manufacturerLogo.name;
            await fs.rename(files.manufacturerLogo.path, coverPath, () => {});
            await imageService.uploadImage(coverPath, files.manufacturerLogo, 'manufacturers/').then();
            const newBrand = await manufacturerModel.add(fields.manufacturerName, coverPath);
            res.json(newBrand);
        }
    });
}

