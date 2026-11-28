const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\mukund\\.gemini\\antigravity\\brain\\33ea2221-aeab-4ff6-b43c-c43d7eff1209';

async function run() {
  console.log('Launching browser for Phase 2 verification...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.toString()));

  // 1. DESKTOP 1440x900 - LANDING PAGE (PAPER THEME)
  console.log('1. Capturing Desktop (1440x900) - Landing Page (Paper)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase2-desktop-landing-paper.png'),
    fullPage: false,
  });

  // 2. DESKTOP 1440x900 - LANDING PAGE (MIDNIGHT LIBRARY THEME)
  console.log('2. Toggling theme to Midnight Library...');
  await page.evaluate(() => {
    const btn = document.getElementById('landing-theme-toggle');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase2-desktop-landing-midnight.png'),
    fullPage: false,
  });

  // Switch back to Paper for auth screens
  await page.evaluate(() => {
    const btn = document.getElementById('landing-theme-toggle');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // 3. DESKTOP 1440x900 - LOGIN PAGE (SPLIT LAYOUT)
  console.log('3. Capturing Desktop (1440x900) - Login Page...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase2-desktop-login.png'),
    fullPage: false,
  });

  // 4. DESKTOP 1440x900 - REGISTER PAGE
  console.log('4. Capturing Desktop (1440x900) - Register Page...');
  await page.goto('http://localhost:5173/register', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase2-desktop-register.png'),
    fullPage: false,
  });

  // 5. DESKTOP 1440x900 - FORGOT PASSWORD PAGE
  console.log('5. Capturing Desktop (1440x900) - Forgot Password Page...');
  await page.goto('http://localhost:5173/forgot-password', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase2-desktop-forgot-password.png'),
    fullPage: false,
  });

  // 6. TABLET 768x1024 - LANDING & LOGIN
  console.log('6. Capturing Tablet (768x1024)...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase2-tablet-landing.png'),
    fullPage: false,
  });

  await page.goto('http://localhost:5173/login', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase2-tablet-login.png'),
    fullPage: false,
  });

  // 7. MOBILE 390x844 - LANDING & LOGIN
  console.log('7. Capturing Mobile (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase2-mobile-landing.png'),
    fullPage: false,
  });

  await page.goto('http://localhost:5173/login', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase2-mobile-login.png'),
    fullPage: false,
  });

  await browser.close();

  console.log('=== PHASE 2 VERIFICATION FINISHED ===');
  console.log('Console Errors caught:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Errors:', consoleErrors);
  }
}

run().catch(err => {
  console.error('Puppeteer run error:', err);
  process.exit(1);
});
