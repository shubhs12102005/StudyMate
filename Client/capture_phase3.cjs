const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\mukund\\.gemini\\antigravity\\brain\\33ea2221-aeab-4ff6-b43c-c43d7eff1209';

async function run() {
  console.log('Launching browser for Phase 3 verification...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.toString()));

  // 1. DESKTOP 1440x900 - DASHBOARD (PAPER THEME)
  console.log('1. Capturing Desktop (1440x900) - Dashboard (Paper)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/dashboard', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3-desktop-dashboard-paper.png'),
    fullPage: false,
  });

  // 2. DESKTOP 1440x900 - DASHBOARD (MIDNIGHT LIBRARY THEME)
  console.log('2. Toggling theme to Midnight Library...');
  await page.evaluate(() => {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3-desktop-dashboard-midnight.png'),
    fullPage: false,
  });

  // Toggle back to Paper
  await page.evaluate(() => {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  // 3. DESKTOP 1440x900 - SUBJECTS HUB
  console.log('3. Capturing Desktop (1440x900) - Subjects Hub...');
  await page.goto('http://localhost:5173/subjects', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3-desktop-subjects.png'),
    fullPage: false,
  });

  // 4. DESKTOP 1440x900 - SUBJECT DETAIL & UPLOAD ZONE (subj-2 Organic Chemistry)
  console.log('4. Capturing Desktop (1440x900) - Subject Detail (Organic Chemistry II)...');
  await page.goto('http://localhost:5173/subjects/subj-2', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1500));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3-desktop-subject-detail.png'),
    fullPage: false,
  });

  // 5. TABLET 768x1024 - DASHBOARD & SUBJECT DETAIL
  console.log('5. Capturing Tablet (768x1024)...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/dashboard', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3-tablet-dashboard.png'),
    fullPage: false,
  });

  await page.goto('http://localhost:5173/subjects/subj-2', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3-tablet-subject-detail.png'),
    fullPage: false,
  });

  // 6. MOBILE 390x844 - DASHBOARD & SUBJECT DETAIL
  console.log('6. Capturing Mobile (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/dashboard', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3-mobile-dashboard.png'),
    fullPage: false,
  });

  await page.goto('http://localhost:5173/subjects/subj-2', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase3-mobile-subject-detail.png'),
    fullPage: false,
  });

  await browser.close();

  console.log('=== PHASE 3 VERIFICATION FINISHED ===');
  console.log('Console Errors caught:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Errors:', consoleErrors);
  }
}

run().catch((err) => {
  console.error('Puppeteer run error:', err);
  process.exit(1);
});
