var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var Role = require('./Role');
var Branch = require('./Branch');

let emailLengthChecker = (email) => {
    if(!email){
        return false;
    }else{
        if(email.length < 5 || email.length > 30){
            return false;
        }else{
            return true;
        }
    }
};

const emailValidators = [
    {
        validator: emailLengthChecker, 
        message: 'E-mail must be at least 5 characters but no more than 30'
    }
];

var userShema = new Schema({
    full_name: {
        type: String,
        required: [true, 'Name required']
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: [true, 'Email unique'],
        lowercase: true,
        validate: emailValidators
    },
    password: {
        type: String
    },
    birth_day: {
        type: Date
    },
    personal_id: {
        type: String
    },
    phone: {
        type: String
    },
    country: {
        type: String
    },
    address: {
        type: String
    },
    possition: {
        type: String
    },
    is_active: {
        type: Boolean
    },
    date_joined: {
        type: Date,
        default: Date.now 
    },
    modified: {
        type: Date
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
    if(!this.isModified('password'))
        return next();
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

userShema.methods.comparePassword = function(password, cb){
    var user = this;
    bcrypt.compare(password, user.password, function(err, res) {
      if (err){
        // handle error
      }
      if (res){
        // Send JWT
      } else {
        // response is OutgoingMessage object that server response http request
        return response.json({success: false, message: 'passwords do not match'});
      }
    });
};

userShema.methods.checkPasswordConfirm = function(pw1, pw2){
    return pw1 === pw2;
};

module.exports = mongoose.model('User', userShema);