var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var branchShema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    location: {
        type: String
    }
});

module.exports = mongoose.model('Branch', branchShema);