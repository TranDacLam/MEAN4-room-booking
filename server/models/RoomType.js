var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomTypeShema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    }
});

module.exports = mongoose.model('RoomType', roomTypeShema);