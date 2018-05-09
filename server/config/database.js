const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
	uri: 'mongodb://localhost/'+ this.dbname,
	secret: crypto,
	dbname: 'room-booking'
}