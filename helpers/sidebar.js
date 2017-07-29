var Stats = require("./stats"),
    Images = require("./images"),
    Comments = require("./comments");

var async = require('async');

module.exports = function(viewModel, callback) {

  async.parallel([
    function(next) {
      next(null, Stats());
    },
    function(next) {
      next(null, Images.popular());
    },
    function(next) {
      Comments.newest(next);
    }
  ], function(err, results) {
    viewModel.sidebar = {
      stats: results[0],
      popular: results[1],
      comments: results[2]
    };

    callback(viewModel);
  });
};
