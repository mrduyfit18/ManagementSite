const express = require('express');
const router = express.Router();
const updateProductController = require('../controllers/updateProductController');

/* GET home page. */

router.post('/:id/save', updateProductController.SaveUpdate);
router.use('/:id', updateProductController.update);


module.exports = router;