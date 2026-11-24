const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  page.on('requestfailed', req => console.log('REQ FAILED:', req.url(), req.failure() ? req.failure().errorText : 'failed'));

  console.log('Navigating to http://localhost:5173/design...');
  await page.goto('http://localhost:5173/design', { waitUntil: 'networkidle0' });
  
  const stylesCount = await page.evaluate(() => document.querySelectorAll('style, link[rel="stylesheet"]').length);
  const bg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
  const color = await page.evaluate(() => window.getComputedStyle(document.body).color);
  
  // Check button style
  const btnStyle = await page.evaluate(() => {
    const btn = document.querySelector('button');
    if (!btn) return 'no button';
    const s = window.getComputedStyle(btn);
    return {
      bg: s.backgroundColor,
      borderRadius: s.borderRadius,
      padding: s.padding,
      color: s.color
    };
  });

  console.log('Styles count in DOM:', stylesCount);
  console.log('Body background:', bg);
  console.log('Body color:', color);
  console.log('First Button style:', btnStyle);

  await browser.close();
})().catch(console.error);
