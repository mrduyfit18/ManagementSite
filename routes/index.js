const express = require('express');
const router = express.Router();
const homeController = require('../controllers/indexController');

/* GET home page. */
router.get('/', homeController.index);

router.get('/add-product', homeController.add);

router.get('/:id', homeController.update);

router.post('/:id/update', homeController.SaveUpdate);

router.post('/add-product', homeController.add);

router.post('/add-product/save-product', homeController.SaveProduct);

router.post('/:id/delete', homeController.delete);

module.exports = router;
