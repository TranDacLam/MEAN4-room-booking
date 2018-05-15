var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('./../../config/database'); 

var routerAuth = require('./auth');
var routerProfile = require('./profile');
var routerMember = require('./member');


router.use('/auth', routerAuth);

router.use((req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
        res.json({status: 401, message: "No token provided"});
    }else{
        console.log(token)
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                res.status(401).json({status: 401, message: "Token invalid" + err});
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }
});

router.use('/profile', routerProfile);
router.use('/member', routerMember);

module.exports = router;