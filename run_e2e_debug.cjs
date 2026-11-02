const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.error('BROWSER ERROR:', error));

  await page.goto('http://localhost:3000/dexhelper/dag');
  await page.waitForTimeout(5000);
  const bodyHTML = await page.innerHTML('body');
  console.log('BODY HTML:', bodyHTML.substring(0, 1000));
  await browser.close();
})();
