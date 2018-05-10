var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('./../config/database'); 

var UserModel = require('./../models/User');

router.post('/', (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.json({success: false, message: "Invalid email or password."});
    }else{
        UserModel.findOne({email: req.body.email.toLowerCase()}, (err, user) => {
            if(err){
                res.json({success: false, message: err});
            }else{
                if(!user || user.comparePassword(req.body.password)){
                    res.json({success: false, message: "Invalid email or password."});
                }else{
                    const token = jwt.sign({ userId: user._id }, config.secret, {expiresIn: '24h'});
                    res.json({success: true, status: 200, message: 'success', token: token, user: user.email});
                }
            }
        });
    }
});

router.use((req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
        res.json({success: false, message: "No token provided"});
    }else{
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                res.json({success: false, message: "Token invalid" + err});
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }
});

router.post('/profile', (req, res) => {
    UserModel.findOne({_id: req.decoded.userId}, (err, user) => {
        if(err){
            res.json({success: false, message: err});
        }else{
            if(!user){
                res.json({success: false, message: "User not found."});
            }else{
                res.json({success: true, user: user});
            }
        }
    });
});

module.exports = router;