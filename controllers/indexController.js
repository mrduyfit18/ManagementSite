const productsModel = require('../models/productsModel');

exports.index = async (req, res, next) => {
    // Get products from model
    const currentPage = req.query.page;
    const pagination = await productsModel.list(currentPage);
    Products = pagination.docs;
    nextPage = pagination.nextPage;
    prevPage = pagination.prevPage;
    page = pagination.page;
    //console.log(products);
    // Pass data to view to display list of products
    res.render('index', { Products, nextPage, prevPage, page});
};

exports.delete = async (req, res, next) => {
    await productsModel.DeleteProduct(req).then(res.redirect('/'));
}