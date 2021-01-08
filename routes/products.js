const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


//Thêm sản phẩm
router.post('/add/save', productController.SaveProduct);
router.all('/add', productController.add);

//Sửa sản phẩm
router.post('/edit/save', productController.SaveUpdate);
router.all('/edit', productController.edit);

//Xoá sản phẩm
router.post('/delete', productController.delete);

//Cập nhật trnagj thái
router.post('/enable', productController.enable);

router.get('/', productController.index);

router.post('/add-manufacturer', productController.addManufacturer);


module.exports = router;