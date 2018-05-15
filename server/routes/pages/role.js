var express = require('express');
var router = express.Router();

var RoleModel = require('./../../models/Role');

router.get('/list', (req, res) => {
    RoleModel.find((err, roles) => {
        if(err){
            res.status(500).json({status: 500, message: err});
        }else{
            res.status(200).json({status: 200, roles: roles});
        }
    });
});

module.exports = router;