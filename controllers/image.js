var fs = require('fs'),
    path = require('path');

var md5 = require("MD5"),
    sidebar = require("../helpers/sidebar"),
    Models = require('../models');

module.exports = {
  index: function(req, res) {
    var viewModel = {
      image: {},
      comments: []
    };

    Models.Image.findOne({filename: {$regex: req.params.image_id}}, function(err, image) {
      if(err) throw err;

      // If there is any image with this name
      if(image) {
        image.views = image.views + 1;
        viewModel.image = image;
        image.save();

        Models.Comment.find({ image_id: image._id }, {}, {$sort: { timestamp: 1 }}, function(err, comments) {
          if(err) throw err;
          viewModel.comments = comments;

          sidebar(viewModel, function(viewModel) {
            console.log(viewModel);
            res.render('image', viewModel);
          });
        });
      } else {
        res.redirect('/');
      }
    });
  },
  create: function(req, res) {
    var saveImage = function () {
      // console.log(req.file);
      var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
      var imgUrl = '';

      // create filenames with 6 random letters
      for(var i = 0; i < 6; i+= 1) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      // console.log(imgUrl);
      Models.Image.find({filename: imgUrl}, function(err, images) {
        if(images.length > 0) {
          saveImage();
        } else {
          var ext = path.extname(req.file.originalname).toLowerCase();
          // console.log('extname: ', ext);
          var tempPath = path.join(__dirname, '../public/upload/temp/', req.file.filename);
          // console.log("file temp name ", tempPath);
          var targetPath = path.resolve(__dirname + '/../public/upload/' + imgUrl + ext);
          // console.log("targetPath: ", targetPath);
          if(ext === '.png' || ext === '.jpg' || ext === 'jpeg' || ext === '.gif') {
            fs.rename(tempPath, targetPath, function(err) {
              if(err) {
                console.log("Error in moving file");
                throw err;
              }

              var newImg = new Models.Image({
                title: req.body.title,
                description: req.body.description,
                filename: imgUrl + ext
              });
              newImg.save(function (err, image) {
                console.log("Successfully inserted image " + image.filename);
                res.redirect("images/" + image.uniqueId);
              });
            });
          } else {
            fs.unlink(tempPath, function (err) {
              if(err) throw err;

              res.status(500).json({
                error: "Only image files are allowed"
              });
            });
          }
        }
      });
    };
    saveImage();
  },
  like: function(req, res) {
    Models.Image.findOne({filename: {$regex: req.params.image_id}}, function(err, image) {
      if(err) throw err;
      if(image) {
        image.likes = image.likes + 1;
        image.save(function(err) {
          if(err)
            res.json(err);
          else
            res.json({likes: image.likes});
        })
      }
    })
  },
  comment: function(req, res) {
    Models.Image.findOne({filename: {$regex: req.params.image_id}}, function(err, image) {
      if(err) throw err;
      if(image) {
        var newComment = new Models.Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        newComment.save(function(err, comment) {
          if(err) throw err;
          res.redirect("/images/" + image.uniqueId + "#" + comment._id);
        });
      } else {
        res.redirect("/");
      }
    });
  },
  remove: function(req, res) {
    Models.Image.findOne({filename: {$regex: req.params.image_id }}, function(err, image) {
      if(err) throw err;
      fs.unlink(path.resolve('./public/upload/' + image.filename), function(err) {
        if(err) throw err;
        Models.Comment.remove({image_id: image._id}, function(err) {
          image.remove(function(err) {
            if(err) {
              res.json(false);
            }
            res.json(true);
          });
        });
      });
    });
  }
};
