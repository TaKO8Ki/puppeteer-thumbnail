const puppeteer = require("puppeteer");
const http = require("http")
const url = require('url');

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

      let html = JSON.parse(body)['html']
      var buffer = new Buffer(html);
      var string = buffer.toString('base64');
      var img;

      console.log(body)
      console.log(html)
      console.log(string)

      if (html != undefined) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
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
        res.end(JSON.parse(`{"response": "NG", "image": ""}`));
      } 
    });
  }
}).listen(3001)