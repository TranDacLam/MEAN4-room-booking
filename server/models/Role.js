var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./User');

var roleShema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Role', roleShema);