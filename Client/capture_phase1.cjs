const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\mukund\\.gemini\\antigravity\\brain\\33ea2221-aeab-4ff6-b43c-c43d7eff1209';

async function run() {
  console.log('Launching browser for Phase 1 verification...');
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

  // 1. DESKTOP 1440x900 - LIGHT THEME (PAPER)
  console.log('1. Capturing Desktop (1440x900) - Dashboard in Paper Theme...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/dashboard', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase1-desktop-paper.png'),
    fullPage: false,
  });

  // 2. DESKTOP 1440x900 - DARK THEME (MIDNIGHT LIBRARY)
  console.log('2. Toggling theme to Midnight Library...');
  await page.evaluate(() => {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase1-desktop-midnight.png'),
    fullPage: false,
  });

  // 3. DESKTOP - COMMAND PALETTE (CTRL+K)
  console.log('3. Opening Command Palette...');
  await page.evaluate(() => {
    const btn = document.getElementById('cmd-palette-btn');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase1-desktop-command-palette.png'),
    fullPage: false,
  });

  // Close command palette with Escape
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  // 4. TABLET 768x1024 - LIGHT & DARK THEME
  console.log('4. Capturing Tablet (768x1024)...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  // Switch back to Paper
  await page.evaluate(() => {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase1-tablet-paper.png'),
    fullPage: false,
  });

  // Toggle to Midnight
  await page.evaluate(() => {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase1-tablet-midnight.png'),
    fullPage: false,
  });

  // 5. MOBILE 390x844 - BOTTOM TAB BAR & RESPONSIVE DESK
  console.log('5. Capturing Mobile (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  // Switch to Paper
  await page.evaluate(() => {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase1-mobile-paper.png'),
    fullPage: false,
  });

  // Toggle to Midnight
  await page.evaluate(() => {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase1-mobile-midnight.png'),
    fullPage: false,
  });

  await browser.close();
  console.log('=== PHASE 1 CAPTURE COMPLETE ===');
  console.log('Console Errors caught:', consoleErrors.length, JSON.stringify(consoleErrors));
}

run().catch(err => {
  console.error('Phase 1 capture failed:', err);
  process.exit(1);
});
