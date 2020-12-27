const formidable = require('formidable');
const fs = require('fs');
const imageService = require('../services/images');
const productsModel = require('../models/productsModel');
const manufacturerModel = require('../models/manufacturerModel');


exports.update =  async (req, res, next) => {
    const Product = await productsModel.getProduct(req.params.id);
    console.log(Product);
    const Manufacturers =  await manufacturerModel.list();
    res.render('update', { Product, Manufacturers});
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

