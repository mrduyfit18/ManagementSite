const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.post('/:id', indexController.enable);

module.exports = router;