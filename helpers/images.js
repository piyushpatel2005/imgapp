var models = require('../models');

module.exports = {
  popular: function(callback) {
    models.Image.find({}, {}, {limit: 9, sort: { likes: -1 }},function (err, images) {
      if(err) {
        console.log("Error in retrieving popoular images");
        throw err;
      }
      console.log(images);
      callback(null, images);
    });
  }
};
