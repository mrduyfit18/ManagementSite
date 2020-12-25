const formidable = require('formidable');
const fs = require('fs');
const imageService = require('../services/uploadImage');
const productsModel = require('../models/productsModel');


exports.update =  async (req, res, next) => {
    const Product = await productsModel.getProduct(req.params.id);
    // Pass data to view to display list of products
    res.render('update', { Product});
}

exports.SaveUpdate =  async (req, res, next) => {
    const form = formidable({ multiples: true });
    let newPath;
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        if(files.cover.name && files.cover.type.includes('image') && files.cover.size>0) {
            const res = files.cover.name.split('.').pop();
            newPath  = files.cover.path + '.' + res;
            fs.rename(files.cover.path, newPath,() => {
                imageService.uploadImage(newPath, files.cover).then();
            });
        }
        productsModel.UpdateProduct(fields, newPath, req.params.id).then(res.redirect('/'));
    });


}

