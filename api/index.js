const express = require('express')
const app = express()
const http = require('follow-redirects').http
const NodeCache = require("node-cache")
const cache = new NodeCache()

app.get('/events', (req, resp) => {
  const url = 'http://script.google.com/macros/s/AKfycbx0CfCoxtsg9Ix7KPwzmZ35ouIwCiWih7rIwQ5hjFypUBMu2T8R/exec'
  returnJson(url, resp, 'events')
})

function returnJson(url, resp, key) {
  let value = cache.get(key)
  if (value != undefined) {
    resp.send(value)
    return
  }

  http.get(url, (res) => {
    let body = ''
    res.setEncoding('utf8')

    res.on('data', (chunk) => {
      body += chunk
    })

    res.on('end', (res) => {
      cache.set(key, body, 30 * 60)
      resp.send(body)
    })
  }).on('error', (e) => {
    console.log(e.message) //エラー時
  })
}

module.exports = {
  path: '/api',
  handler: app
}