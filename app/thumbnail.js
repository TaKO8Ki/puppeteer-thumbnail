const http = require("http");
const helper = require('./helper');
require('dotenv').config();

process.on('uncaughtException', function(err) {
  console.log(err);
});

//エンコードされたhtmlを受け取り、それを画像に変換してbase64で返すAPIサーバー
var server = http.createServer(async function (req, res) {
  const { headers, method, url } = req;
  console.log(`${req.method} http://${process.env.DOMAIN}:${process.env.PORT}${req.url}`)
  
  if (method === 'POST' && req.url === '/image') {
    var body = '';
    req.on('error', (err) => {
      console.error(err); 
    }).on('data', (chunk) => {
      body += chunk
    }).on('end', () => {
      var html = JSON.parse(body)['html']
      var img;

      res.setHeader('Content-Type', 'application/json');

      console.log(html)

      if (html === undefined) {
        res.statusCode = 400;
        res.end(`{"response": "NG", "message": "You need the key, "html" in JSON."}`);        
      }

      if (!helper.hasIDImage(html)) {
        res.statusCode = 400;
        res.end(`{"response": "NG", "message": "You have to include #image in HTML."}`);        
      }

      if (html != undefined) {
        res.statusCode = 200;
        helper.createImage(img, html, res)
      } else {
        res.statusCode = 400;
        res.end(`{"response": "NG", "message": "HTML doesn't exist."}`);
      } 
    });
  } else if (method !== 'POST') {
    res.statusCode = 400;
    res.end(`{"response": "NG", "message": "Method is not allowed."}`); 
  } else {
    res.statusCode = 404;
    res.end(`{"response": "NG", "message": "Page doesn't exist."}`);     
  }
}).listen(process.env.PORT)

server.timeout = 10000;
