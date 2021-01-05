const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/:id/save', usersController.saveProfileChange);
router.get('/:id', usersController.edit);
router.get('/', usersController.listindex);
router.post('/block/:id', usersController.block);
router.post('/unblock/:id', usersController.unblock);



module.exports = router;
