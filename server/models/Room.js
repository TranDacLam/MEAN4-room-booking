var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RoomType = require('./RoomType');
var Branch = require('./Branch');
var Booking = require('./Booking');

var roomShema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    status: {
 		type: String,
 		enum: ['Enable', 'Disable']
 	},
    type: {
        type: Schema.Types.ObjectId,
        ref: 'RoomType'
    },
 	branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch'
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]
});

module.exports = mongoose.model('Room', roomShema);