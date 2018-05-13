var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Branch = require('./Branch');

var companyShema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    country: {
        type: String,
        required: [true, 'Country required']
    },
    owner: {
        type: Schema.Types.ObjectId
    },
    branchs: [{ type: Schema.Types.ObjectId, ref: 'Branch' }]
});

module.exports = mongoose.model('Company', companyShema);