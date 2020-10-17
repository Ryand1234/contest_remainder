const puppeteer = require('puppeteer');

url = 'https://www.codechef.com/contests'
const hello = async () => {
const browser = await puppeteer.launch({
  headless: true,
});
const page = await browser.newPage();
//await page.setRequestInterception(true);
await page.goto('https://www.codechef.com/contests');
const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll('table tr td'))
    return tds.map(td => td.innerText)
  });

  //You will now have an array of strings
  //[ 'One', 'Two', 'Three', 'Four' ]
  console.log(data);
  //One
  console.log(data[0]);
  await browser.close()
  };
  hello()