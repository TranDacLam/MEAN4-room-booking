var express = require('express');
var router = express.Router();

var api_page = require('./pages/index');
var api_admin = require('./admin/index');

router.use('/api', api_page);
router.use('/admin/api', api_admin);

module.exports = router;