var express = require('express')
var app = express();
const path = require('path');
var process = require('process')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/osm.html'));
});

app.get('/osm.html', function(req, res) {
    res.sendFile(path.join(__dirname+'/osm.html'));
});

app.get('/all.html', function(req, res) {
    res.sendFile(path.join(__dirname+'/all.html'));
});

app.get('/all.js', function(req, res) {
    res.sendFile(path.join(__dirname+'/all.js'));
});

app.get('/osm.js', function(req, res) {
    res.sendFile(path.join(__dirname+'/osm.js'));
});

let port = process.env.port;
if(port==null || port==""){
    port = 8000;
}
app.listen(port);