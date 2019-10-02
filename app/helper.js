const puppeteer = require("puppeteer");
const HTMLParser = require('node-html-parser');

function hasIDImage(html) {
  var decodedHtml = Buffer.from(html,'base64').toString();
  var root = HTMLParser.parse(decodedHtml);
  return root.querySelector('#image') !== null
};

async function createImage(img, html, res) {
  const browser = await puppeteer.launch(
    {
      args: ['--lang=ja,en-US,en', '--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: 'google-chrome-unstable',
    }
  );
  const page = await browser.newPage();
  const targetElementSelector = '#image';

  await page.goto(`data:text/html;charset=UTF-8;base64,${html}`, { waitUntil: 'networkidle0' });

  const clip = await page.evaluate(s => {
    const el = document.querySelector(s)
    const { width, height, top: y, left: x } = el.getBoundingClientRect()
    return { width, height, x, y }
  }, targetElementSelector)

  img = await page.screenshot({clip, encoding: "base64"});
  await browser.close();

  res.end(`{"response": "OK", "image": "${img}"}`);
}

exports.hasIDImage = hasIDImage;
exports.createImage = createImage;
