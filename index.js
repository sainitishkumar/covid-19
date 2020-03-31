var express = require('express')
var app = express();
var path = require('./');

app.get('/', function(req, res) {
    res.sendFile('./osm.html');
});

app.listen(8080);