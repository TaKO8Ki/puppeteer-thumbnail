const puppeteer = require("puppeteer");
const http = require("http")

//受け取ったhtmlを画像に変換してbase64で返すAPIサーバー
http.createServer(async function (req, res) {
  const { headers, method, url } = req;

  if (method == 'POST') {
    var body = '';
    req.on('error', (err) => {
      console.error(err); 
    }).on('data', (chunk) => {
      body += chunk
    }).on('end', () => {

      res.on('error', (err) => {
        console.error(err);
      });

      //画像に変換するHTML
      let html = ` 
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="localhost:stylesheet/application.css">
      </head>
      <div id="image">
        <div class="content">
          <p class="text">ホゲホゲほげ</p>
        </div>
      </div>
      <style>
        * {
          margin: 0;padding: 0;
        }

        body {
          font-family: 'M PLUS Rounded 1c', sans-serif;
        }

        #image {
          display: table;
          text-align: center;
          padding: 0px 30px;
          width: 540px;
          height: 314px;
          background: #16a085;
        }

        #image div.content {
          font-size: 25px;
          font-weight: bold;
          display: table-cell;
          vertical-align: middle;
          word-break: break-all;
        }

        #image p.text {
          background: #fff;
          border-radius: 10px;
          padding: 110px 0px;
        }
      </style> 
      </html>
      `;

      var buffer = new Buffer(html);
      var string = buffer.toString('base64');
      var img;

      console.log(body)
      console.log(html)
      console.log(string)

      res.setHeader('Content-Type', 'application/json');

      if (html != undefined) {
        res.statusCode = 200;
        (async () => {
          const browser = await puppeteer.launch(
            {args: ['--lang=ja,en-US,en']}
          );
          const page = await browser.newPage();
          const targetElementSelector = '#image'
          await page.goto(`data:text/html;charset=UTF-8;base64,${string}`, { waitUntil: 'networkidle0' });

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
  }

}).listen(3001)