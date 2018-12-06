const https = require('https'),
  $ = require('cherio');

module.exports = {
  parseNameBirthday: function(url) {
    return new Promise(function(resolve, reject) {
      https
        .get(url, function(res) {
          let body = '';

          res.on('data', function(chunk) {
            body += chunk;
          });

          res.on('end', function() {
            resolve({
              name: $('.firstHeading', body).text(),
              birthday: $('.bday', body).text()
            });
          });
        })
        .on('error', function(err) {
          console.error(`Error: ${err}`);
          reject(err);
        });
    });
  }
};
