const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
	uri: 'mongodb://localhost/room-booking',
	secret: crypto,
	dbname: 'room-booking'
}