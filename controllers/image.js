var fs = require('fs'),
    path = require('path');

module.exports = {
  index: function(req, res) {
    var viewModel = {
      image: {
        uniqueId: 1,
        title: 'Sample Image 1',
        description: "This is a sample 1",
        filename: 'sample1.jpg',
        views: 0,
        likes: 0,
        timestamp: Date.now()
      },
      comments: [
        {
          image_id: 1,
          email: 'test@test.com',
          name: 'Test',
          gravatar: 'http://lorempixel.com/75/75/animals/1',
          comment: 'This is test..',
          timestamp: Date.now()
        },
        {
          image_id: 1,
          email: 'test@test.com',
          name: 'Test',
          gravatar: 'http://lorempixel.com/75/75/animals/2',
          comment: 'Another comment.',
          timestamp: Date.now()
        }
      ]
    };

    res.render('image', viewModel);
  },
  create: function(req, res) {
    var saveImage = function () {
      console.log(req.file);
      var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
      var imgUrl = '';

      // create filenames with 6 random letters
      for(var i = 0; i < 6; i+= 1) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      // console.log(imgUrl);
      var ext = path.extname(req.file.originalname);
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

          res.redirect('/images/' + imgUrl);
        });
      } else {
        fs.unlink(tempPath, function (err) {
          if(err) throw err;

          res.status(500).json({
            error: "Only image files are allowed"
          });
        })
      }
    }
    saveImage();
    // console.log(req.files[0]);
  },
  like: function(req, res) {
    res.send("The image: like POST controller");
  },
  comment: function(req, res) {
    res.send("The image: comment POST controller");
  }
};
