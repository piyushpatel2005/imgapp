var path = require('path');
var fs = require('fs');
console.log(path.join(__dirname, '/public/upload/temp/', 'file-123.jpg'));
fs.rename(__dirname + '/public/upload/temp/file-1501204135094.jpg', __dirname + '/public/upload/file.jpg');
