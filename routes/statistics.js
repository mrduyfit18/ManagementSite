const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');


router.get('/', statisticsController.index);

router.get('/get', statisticsController.getStatistic);


module.exports = router;
