const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Screenshot 1: Hero
  await page.screenshot({ path: 'public/screenshot-hero.png' });
  
  // Screenshot 2: Problem Section & Introducing
  await page.evaluate(() => window.scrollBy(0, 900));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/screenshot-problem.png' });

  // Screenshot 3: Features / Value Props
  await page.evaluate(() => window.scrollBy(0, 900));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/screenshot-features.png' });
  
  await browser.close();
})();
