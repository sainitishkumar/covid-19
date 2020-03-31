var express = require('express')
var app = express();
const path = require('path');
var process = require('process')

app.get('/', function(req, res) {
    res.redirect("/osm.html");
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

app.get('/js/jquery-1.11.3.min.js', function(req, res) {
    res.sendFile(path.join(__dirname+'/js/jquery-1.11.3.min.js'));
});

app.get('/js/jquery-migrate-1.2.1.min.js', function(req, res) {
    res.sendFile(path.join(__dirname+'/osm.html'));
});

app.get('/js/bootstrap.min.js', function(req, res) {
    res.sendFile(path.join(__dirname+'/js/bootstrap.min.js'));
});

app.get('/js/leaflet.js', function(req, res) {
    res.sendFile(path.join(__dirname+'/js/leaflet.js'));
});

app.get('/js/images/marker-icon.png', function(req, res) {
    res.sendFile(path.join(__dirname+'/images//marker-icon.png'));
});

app.get('/js/images/marker-shadow.png', function(req, res) {
    res.sendFile(path.join(__dirname+'/images//marker-shadow.png'));
});

let port = process.env.PORT || 3000;

console.log("port", port);
app.listen(port);