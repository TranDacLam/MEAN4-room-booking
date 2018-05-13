var express = require('express');
var router = express.Router();
var multer = require('multer');

 var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

var UserModel = require('./../../models/User');

router.get('/', (req, res) => {
    UserModel.findOne({_id: req.decoded.userId}, (err, user) => {
        if(err){
            res.status(500).json({status: 500, message: err});
        }else{
            if(!user){
                res.status(404).json({status: 404, message: "User not found."});
            }else{
                res.status(200).json({status: 200, user: user});
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

            console.log(user)

            user.save(function(err) {
                if (err)
                    res.status(400).json({status: 400, message: err });
                res.status(200).json({status: 200, message: 'User updated!', user: user });
            });
        }
    });
});

router.put('/upload', function(req, res) {
    upload(req,res,function(err){
        console.log(req.file);
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        res.json({error_code:0,err_desc:null});
    });
});

module.exports = router;