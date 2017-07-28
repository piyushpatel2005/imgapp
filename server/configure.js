var path = require('path'),
    fs = require('fs'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    moment = require('moment'),
    multer = require('multer');
var upload = multer({dest: "public/upload/temp/"});


module.exports = function(app) {
  app.use(morgan('dev'));

  app.use(upload.single('file'));
  app.use(bodyParser.urlencoded({'extended': true}));

  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser('some-secret-value-here'));


  routes(app);
  // static middleware must come after routes.
  app.use('/public/', express.static(path.join(__dirname, '../public')));

  if('development' === app.get('env')) {
    app.use(errorHandler());
  }

  app.engine("handlebars", exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get("views") + '/layouts',
    partialsDir: [app.get("views") + '/partials'],
    helpers: {
      timeago: function(timestamp) {
        return moment(timestamp).startOf("minute").fromNow();
      }
    }
  }).engine);
  app.set('view engine', 'handlebars');

  return app;
};
