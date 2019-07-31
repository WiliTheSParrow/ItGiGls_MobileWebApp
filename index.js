var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

/*app.get("/", function(req, res){
    res.send("Welcome to it GiGls Mobile Web App!");
});*/

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.listen(port);