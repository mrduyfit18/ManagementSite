const express = require('express');
const router = express.Router();
const addProductController = require('../controllers/addProductController');


router.all('/', addProductController.add);


router.post('/save', addProductController.SaveProduct);


module.exports = router;