const https = require('https'),
  $ = require('cherio'),
  parse = require('./parse'),
  url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

https
  .get(url, function(res) {
    let body = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      const wikiUrls = [];

      for (let i = 0; i < 45; i++) {
        wikiUrls.push($('big > a', body)[i].attribs.href);
      }

      return Promise.all(
        wikiUrls.map(function(url) {
          return parse.parseNameBirthday(`https://en.wikipedia.org${url}`);
        })
      )
        .then(function(presidents) {
          console.log(presidents);
        })
        .catch(function(err) {
          console.error(err);
        });
    });
  })
  .on('error', function(err) {
    console.error(`Error: ${err}`);
  });

https
  .createServer(function(req, res) {
    res.end();
  })
  .listen(3000, function() {
    console.log('Still tippin on Port: 3000');
  });
