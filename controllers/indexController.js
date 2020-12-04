const productsModel = require('../models/productsModel');

exports.index = async (req, res, next) => {
    // Get products from model
    const products = await productsModel.list();
    //console.log(products);
    // Pass data to view to display list of products
    res.render('index', { Products: products});
};

exports.delete = async (req, res, next) => {
    await productsModel.DeleteProduct(req).then(res.redirect('/'));
}