var express = require('express');
var router = express.Router();

var routerUsers = require('./users');

router.use('/users', routerUsers);

module.exports = router;