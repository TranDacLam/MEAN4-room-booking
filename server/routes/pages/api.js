var express = require('express');
var router = express.Router();

var routerUsers = require('./users');
var routerAuth = require('./../auth');

router.use('/users', routerUsers);
router.use('/auth', routerAuth);

module.exports = router;