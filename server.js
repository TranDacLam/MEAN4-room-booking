var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var mongoose = require('mongoose');
var app = express();

var config = require('./server/config/database');

mongoose.connect(config.uri);

var api = require('./server/routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', api);

app.get('*'), (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
};

var port = process.env.POST || '3000';
app.set('port', port);

var server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost: ${port}`));