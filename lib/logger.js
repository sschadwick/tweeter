module.exports = exports = function(data) {
  var fs = require('fs');
  var header = ['Username', 'Post ID', 'Post Text', 'Interaction Type', 'Twitter User', 'Created At',
                'Geographic Region', 'Character Count', 'AutoTweet?'
                ].join('\t');

  fs.readFile('./data/' + data.username + '.xls', function(err, file) {
    var writeStream = fs.createWriteStream('./data/' + data.username + '.xls');
    var post = [data.username, data.postId, data.postText, data.type, data.user, data.createdAt, data.region, data.size, data.auto].join('\t');

    if (!file) {
      writeStream.write(header + '\n' + post + '\n');
    } else {
      writeStream.write(file + post + '\n');
    }
    writeStream.close();
  });
};
