const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\mukund\\.gemini\\antigravity\\brain\\33ea2221-aeab-4ff6-b43c-c43d7eff1209';

async function run() {
  console.log('Launching browser via puppeteer-core with Edge...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  // 1. DESKTOP 1440x900 - LIGHT THEME (PAPER)
  console.log('1. Capturing Desktop (1440x900) - Light Theme...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:5173/design', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase0-desktop-paper.png'),
    fullPage: false,
  });

  // 2. DESKTOP 1440x900 - DARK THEME (MIDNIGHT LIBRARY)
  console.log('2. Toggling theme to Midnight Library...');
  const themeToggle = await page.waitForSelector('button[aria-label*="Toggle between"]');
  await themeToggle.click();
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase0-desktop-midnight.png'),
    fullPage: false,
  });

  // 3. INTERACTIVE ATOMS TEST IN DARK MODE (3D Flip, Citation, AI Stream)
  console.log('3. Testing interactive atoms (3D Flashcard flip, Citation chip, AI Stream)...');
  // Click flashcard to flip
  const flashcard = await page.$('div[style*="perspective"]');
  if (flashcard) {
    await flashcard.click();
    await new Promise(r => setTimeout(r, 600));
  }

  // Click citation chip p. 14
  const citationChip = await page.$('button[title*="Jump to page 14"]');
  if (citationChip) {
    await citationChip.click();
    await new Promise(r => setTimeout(r, 400));
  }

  // Click test AI stream button
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Test AI Stream')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase0-desktop-interactions.png'),
    fullPage: false,
  });

  // 4. TABLET 768x1024 - LIGHT & DARK THEME
  console.log('4. Capturing Tablet (768x1024) - Paper & Midnight...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  // Toggle back to Paper
  await themeToggle.click();
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase0-tablet-paper.png'),
    fullPage: false,
  });

  // Toggle to Midnight
  await themeToggle.click();
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase0-tablet-midnight.png'),
    fullPage: false,
  });

  // 5. MOBILE 390x844 - LIGHT & DARK THEME
  console.log('5. Capturing Mobile (390x844) - Paper & Midnight...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  // Toggle to Paper
  await themeToggle.click();
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase0-mobile-paper.png'),
    fullPage: false,
  });

  // Toggle to Midnight
  await themeToggle.click();
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'phase0-mobile-midnight.png'),
    fullPage: false,
  });

  await browser.close();

  console.log('=== CAPTURE COMPLETE ===');
  console.log('Console Errors caught:', consoleErrors.length, JSON.stringify(consoleErrors));
}

run().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
