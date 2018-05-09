var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Branch = require('./Branch');
var User = require('./User');

var BookingchShema = new Schema({
    date: {
        type: Date,
        required: [true, 'Date required']
    },
    start_time: {
        type: String,
        required: [true, 'Start time required']
    },
    end_time: {
        type: String,
        required: [true, 'End time required']
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Booking', BookingchShema);