var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get("/", function (req, res) {
    response.render('index');
});

app.listen(app.get('port'), function () {
    console.log("ItGiGls is running on port ", app.get('port'));
});
