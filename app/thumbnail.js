const puppeteer = require("puppeteer");
const http = require("http")
require('dotenv').config();

//エンコードされたhtmlを受け取り、それを画像に変換してbase64で返すAPIサーバー
http.createServer(async function (req, res) {
  const { headers, method, url } = req;
  console.log(`${req.method} http://${process.env.DOMAIN}:${process.env.PORT}${req.url}`)
  
  if (method == 'POST' && req.url == '/image') {
    var body = '';
    req.on('error', (err) => {
      console.error(err); 
    }).on('data', (chunk) => {
      body += chunk
    }).on('end', () => {

      res.on('error', (err) => {
        console.error(err);
      });

      let html = JSON.parse(body)['html']
      var img;

      res.setHeader('Content-Type', 'application/json');

      if (html != undefined) {
        res.statusCode = 200;
        (async () => {
          const browser = await puppeteer.launch(
            {
              args: ['--lang=ja,en-US,en', '--no-sandbox', '--disable-setuid-sandbox'],
              executablePath: 'google-chrome-unstable',
            }
          );
          const page = await browser.newPage();
          const targetElementSelector = '#image'
          await page.goto(`data:text/html;charset=UTF-8;base64,${html}`, { waitUntil: 'networkidle0' });

          const clip = await page.evaluate(s => {
            const el = document.querySelector(s)
            const { width, height, top: y, left: x } = el.getBoundingClientRect()
            return { width, height, x, y }
          }, targetElementSelector)
    
          img = await page.screenshot({clip, encoding: "base64"});
          await browser.close();

          res.end(`{"response": "OK", "image": "${img}"}`);
        })();
      } else {
        res.statusCode = 400;
        res.end(`{"response": "NG", "image": ""}`);
      } 
    });
  } else {
    res.statusCode = 200;
    res.end(`{"response": "NG", "image": ""}`); 
  }
}).listen(process.env.PORT)
