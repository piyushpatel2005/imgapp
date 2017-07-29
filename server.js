var express = require('express');
var config = require('./server/configure');
var app = express();
var mongoose = require("mongoose");

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app);

mongoose.connect("mongodb://localhost:27017/imgapp");
mongoose.connection.on("open", function () {
  console.log("Mongoose connected.");
});

// app.get('/', function(req, res) {
//   res.send("Hello World");
// });

var server = app.listen(app.get('port'), function () {
  console.log("Server up: http://localhost:" + app.get('port'));
});
