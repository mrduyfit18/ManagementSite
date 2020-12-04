const productsModel = require('../models/productsModel');

exports.add = (req, res, next) => {
    res.render('add');
}

exports.SaveProduct =  async (req, res, next) => {
    await productsModel.AddProduct(req).then(res.redirect('/'));

}