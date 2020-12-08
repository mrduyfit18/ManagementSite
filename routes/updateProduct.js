const express = require('express');
const router = express.Router();
const updateProductController = require('../controllers/updateProductController');

/* GET home page. */

router.use('/:id', updateProductController.update);


router.post('/save', updateProductController.SaveUpdate);


module.exports = router;