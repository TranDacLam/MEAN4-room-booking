var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RoomType = require('./RoomType');

var roomShema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'RoomType'
    },
    status: {
 		type: String,
 		enum: ['Enable', 'Disable']
 	}
});

module.exports = mongoose.model('Room', roomShema);