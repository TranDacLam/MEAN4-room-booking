var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');
var Booking = require('./Booking');

var TimeBookingchShema = new Schema({
    start_time: {
        type: String,
        required: [true, 'Start time required']
    },
    end_time: {
        type: String,
        required: [true, 'End time required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }
});

module.exports = mongoose.model('TimeBooking', TimeBookingchShema);