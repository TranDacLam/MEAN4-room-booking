var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Room = require('./Room');
var TimeBooking = require('./TimeBooking');

var BookingchShema = new Schema({
    date: {
        type: Date,
        required: [true, 'Date required']
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    },
    time_bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'TimeBooking'
    }]
});

module.exports = mongoose.model('Booking', BookingchShema);