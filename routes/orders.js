const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.post('/:id/update', ordersController.update);

router.get('/:id', ordersController.detail);

router.get('/', ordersController.index);


module.exports = router;
