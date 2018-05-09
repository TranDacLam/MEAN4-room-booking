var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companyShema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    owner: {
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Company', companyShema);