const formidable = require('formidable');
const fs = require('fs');
const imageService = require('../services/images');
const productsModel = require('../models/productsModel');
const manufacturerModel = require('../models/manufacturerModel');


exports.add = async (req, res, next) => {
    const Manufacturers =  await manufacturerModel.list();
    res.render('add', {Manufacturers});
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
            const res = files.cover.name.split('.').pop();
            coverPath = files.cover.path + '.' + res;
            await fs.rename(files.cover.path, coverPath, () => {
                imageService.uploadImage(coverPath, files.cover).then();
            });
            for(let file of files.productImages){
                const res = file.name.split('.').pop();
                newPath.push(file.path + '.' + res);
                await fs.rename(file.path, newPath[newPath.length - 1],  () => {console.log('Đã đổi tên file')});
                await imageService.uploadImage(newPath[newPath.length - 1], file);
            }
        }
        await productsModel.AddProduct(fields, newPath, coverPath).then(res.redirect('/'));
    });
}