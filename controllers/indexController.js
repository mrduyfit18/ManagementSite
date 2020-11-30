const productsModel = require('../models/productsModel');

exports.index = async (req, res, next) => {
    // Get products from model
    const products = await productsModel.list();
    //console.log(products);
    // Pass data to view to display list of products
    res.render('index', { Products: products});
};

exports.update =  async (req, res, next) => {
    const Product = await productsModel.getProduct(req.params.id);
    //console.log(products);
    // Pass data to view to display list of products
    res.render('update', { Product});
}

exports.SaveUpdate =  async (req, res, next) => {
    await productsModel.UpdateProduct(req).then(res.redirect('/'));

}

exports.add = (req, res, next) => {
    res.render('add');
}

exports.SaveProduct =  async (req, res, next) => {
    await productsModel.AddProduct(req).then(res.redirect('/'));

}

exports.delete = async (req, res, next) => {
    await productsModel.DeleteProduct(req).then(res.redirect('/'));
}