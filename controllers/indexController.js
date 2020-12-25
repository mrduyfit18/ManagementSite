const productsModel = require('../models/productsModel');

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
    const pagination = await productsModel.list(req.query ? {'type': { "$regex": option, "$options": "i" } , 'name': { "$regex": name, "$options": "i" }}:{} ,currentPage);
    const Products = pagination.docs;
    const nextPage = pagination.nextPage;
    const prevPage = pagination.prevPage;
    const page = pagination.page;
    // Pass data to view to display list of products
    res.render('index', { Products, nextPage, prevPage, page, Desktopscheck, Laptopscheck, Tabletscheck, Hybridscheck, Allcheck});
};

exports.delete = async (req, res, next) => {
    await productsModel.DeleteProduct(req).then(res.redirect('/'));
}