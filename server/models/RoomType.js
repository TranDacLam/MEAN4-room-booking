var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Room = require('./Room');

var roomTypeShema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }]
});

module.exports = mongoose.model('RoomType', roomTypeShema);