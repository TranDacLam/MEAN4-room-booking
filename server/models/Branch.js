var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Company = require('./Company');
var Room = require('./Room');

var branchShema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    location: {
        type: String,
        required: [true, 'Locaion required']
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, 'Company required']
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }]
});

module.exports = mongoose.model('Branch', branchShema);