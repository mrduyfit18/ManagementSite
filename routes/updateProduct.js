const express = require('express');
const router = express.Router();
const updateProductController = require('../controllers/addProductController');

/* GET home page. */

router.post('/:id', updateProductController.add);
router.get('/:id', updateProductController.add);

router.post('/save', updateProductController.SaveProduct);


module.exports = router;