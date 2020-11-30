const express = require('express');
const router = express.Router();
const homeController = require('../controllers/indexController');

/* GET home page. */
router.get('/', homeController.index);

module.exports = router;
