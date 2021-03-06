const express = require('express');
const router = express.Router();
const passport = require('../passport/index');


router.post('/', passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login' }));


module.exports = router;