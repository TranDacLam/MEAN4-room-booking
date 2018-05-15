var express = require('express');
var router = express.Router();

var UserModel = require('./../../models/User');
var RoleModel = require('./../../models/Role');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findOne({_id: id}, (err, user) => {
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

router.get('/list', (req, res) => {
    UserModel.find((err, users) => {
        if(err){
            res.status(500).json({status: 500, message: err});
        }else{
            res.status(200).json({status: 200, user: users});
        }
    });
});

router.post('/', (req, res) => {
    let user = new UserModel();
    user.full_name = req.body.full_name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.birth_day = req.body.birth_day;
    user.personal_id = req.body.personal_id;
    user.phone = req.body.phone;
    user.intro_yourself = req.body.intro_yourself;
    user.country = req.body.country;
    user.address = req.body.address;
    user.possition = req.body.possition;
    user.date_joined = new Date();
    user.is_active = true;

    user.save(function(err) {
        if (err)
            res.status(400).json({status: 400, message: err });
        res.status(200).json({status: 200, message: 'Add member success!' });
    });
});

router.put('/:id', (req, res) => {
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

module.exports = router;