const https = require('https'),
  fs = require('fs'),
  $ = require('cherio'),
  puppeteer = require('puppeteer'),
  url = 'https://www.reddit.com';

puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    $('h2', html).each(function() {
      fs.appendFile('returnedText.txt', `${$(this).text()}\n\r`, function(err) {
        if (err) throw err;
        console.log('Great Success!');
      });
    });
  })
  .catch(function(err) {
    console.error(err);
  });
