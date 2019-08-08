const path = require("path");

var express = require("express");

var favicon = require('serve-favicon');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
app.use(express.static(__dirname+''));
app.use(express.static(__dirname));

app.use(express.static('src'));
app.use(express('public'));
app.use(favicon(__dirname + '/public/img/hands4_SKG_icon.ico'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});



server.connection({
  host: (process.env.HOST || 'localhost'),
  port: (process.env.PORT || 3000)
});