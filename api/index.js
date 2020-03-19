const express = require('express');
const app = express();
const http = require('follow-redirects').http;

app.get("/events", (req, resp) => {
    const url = 'http://script.google.com/macros/s/AKfycbx0CfCoxtsg9Ix7KPwzmZ35ouIwCiWih7rIwQ5hjFypUBMu2T8R/exec';
    returnJson(url,resp);
})

function returnJson(url,resp){
  http.get(url, (res) => {
    let body = '';
    res.setEncoding('utf8');
  
    res.on('data', (chunk) => {
        body += chunk;
    });
  
    res.on('end', (res) => {
        resp.send(body);
    });
  }).on('error', (e) => {
    console.log(e.message); //エラー時
  });
}

module.exports = {
  path: '/api',
  handler: app
}