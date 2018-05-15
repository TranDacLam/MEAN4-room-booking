var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/avatar/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).single('avatar');

var UserModel = require('./../../models/User');
var RoleModel = require('./../../models/Role');

router.get('/', (req, res) => {
    UserModel.findOne({_id: req.decoded.userId}, (err, user) => {
        if(err){
            res.status(500).json({status: 500, message: err});
        }else{
            if(!user){
                res.status(404).json({status: 404, message: "User not found."});
            }else{
                RoleModel.findOne({_id: user.role}, (err, role) => {
                    if(err){
                        res.status(500).json({status: 500, message: err});
                    }else{
                        user.role = role;
                        res.status(200).json({status: 200, user: user});
                    }
                });
            }
        }
    });
});

router.put('/', (req, res) => {
    UserModel.findOne({_id: req.decoded.userId}, (err, user) => {
        if(err){
            res.status(500).json({status: 500, message: err});
        }else{
            user.full_name = req.body.full_name;
            user.birth_day = req.body.birth_day;
            user.personal_id = req.body.personal_id;
            user.phone = req.body.phone;
            user.intro_yourself = req.body.intro_yourself;
            user.country = req.body.country;
            user.address = req.body.address;
            user.possition = req.body.possition;
            user.link_facebook = req.body.link_facebook;
            user.modified = new Date();

            user.save(function(err) {
                if (err)
                    res.status(400).json({status: 400, message: err });
                res.status(200).json({status: 200, message: 'User updated!', user: user });
            });
        }
    });
});

router.put('/change-password', (req, res) => {
    UserModel.findOne({_id: req.decoded.userId}, (err, user) => {
        if(err){
            res.status(500).json({status: 500, message: err});
        }else{
            if(!user){
                res.status(404).json({status: 404, message: "User not found."});
            }else{
                user.comparePassword(req.body.password, function(err, isMatch){
                    if(err)
                        res.status(500).json({status: 500, message: err});
                    if(isMatch){
                        user.password = req.body.new_password;
                        user.modified = new Date();
                        user.save(function(err) {
                            if (err)
                                res.status(400).json({status: 400, message: err });
                            res.status(200).json({status: 200, message: 'User updated!', user: user });
                        });
                    }else{
                        res.status(400).json({status: 400, message: "Invalid email or password."});
                    }
                });
            }
        }
    });
});

router.put('/upload', (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            res.status(500).json({status: 500, message: err});
        }
        UserModel.findOne({_id: req.decoded.userId}, (err, user) => {
            if(err){
                res.status(500).json({status: 500, message: err});
            }else{
                user.avatar = '/avatar/' + req.file.filename;
                user.modified = new Date();

                user.save(function(err) {
                    if (err)
                        res.status(400).json({status: 400, message: err });
                    res.status(200).json({status: 200, message: 'User updated!', user: user });
                });
            }
        });
    })
    
});

module.exports = router;