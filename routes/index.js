const express = require('express');
const router = express.Router();
const homeController = require('../controllers/indexController');

/* GET home page. */
router.get('/', homeController.index);

router.get('/:id', homeController.update);

router.post('/:id/update', homeController.SaveUpdate);

router.post('/:id/delete', homeController.delete);

module.exports = router;
