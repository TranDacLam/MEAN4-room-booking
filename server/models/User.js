var mongoose = require('mongoose');
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

module.exports = mongoose.model('User', userShema);