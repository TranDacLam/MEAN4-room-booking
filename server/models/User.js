var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var Role = require('./Role');
var Branch = require('./Branch');

var userShema = new Schema({
    full_name: {
        type: String,
        required: [true, 'Name required']
    },
    avatar: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    birth_day: {
        type: Date
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    possition: {
        type: String
    },
    role: { 
        type: Schema.Types.ObjectId, 
        ref: 'Role', 
        default: null 
    },
    branch: { 
        type: Schema.Types.ObjectId, 
        ref: 'Branch' 
    },
});

userShema.pre('save', function(next){
    var user = this;
    this.hashPassword(user.password, function(err, hash){
        if(err) return next(err);
        user.password = hash;

        next();
    });
});

userShema.methods.hashPassword = function(candidatePassword, cb){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(candidatePassword, salt, function(err, hash) {
            return cb(null, hash);
        });
    });
};

userShema.methods.checkPasswordConfirm = function(pw1, pw2){
    return pw1 === pw2;
};

module.exports = mongoose.model('User', userShema);