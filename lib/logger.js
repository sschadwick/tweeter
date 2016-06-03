module.exports = exports = function(req, res) {
  var fs = require('fs');

  var header = ['Post ID', 'Post Text', 'Interaction Type', 'User', 'Date',
                'Time', 'Country', 'Geographic Region', 'Gender', 'Age',
                'Hashtag 1', 'Hashtag 2', 'Hashtag 3', 'Character Count',
                'Post Type', 'Retweeted?'].join('\t');

  fs.readFile('file.xls', function(err, data) {
    var writeStream = fs.createWriteStream('file.xls');
    var post = ['booku bucks', 'Lalala', 'TWEET'].join('\t');

    if (!data) {
      writeStream.write(header + '\n' + post + '\n');
    } else {
      writeStream.write(data + post + '\n');
    }
    writeStream.close();
  });
};
