var express = require('express');
// var config = require('./server/configure');
var app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
// app = config(app);

app.get('/', function(req, res) {
  res.send("Hello World");
});

app.listen(app.get('port'), function () {
  console.log("Server up: http://localhost:" + app.get('port'));
});
