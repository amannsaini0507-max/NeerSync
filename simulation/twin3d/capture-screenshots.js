import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('Starting Playwright browser runner...');
  const outDir = path.resolve('./screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--use-gl=swiftshader']
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  console.log('Navigating to http://localhost:4173...');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });

  // Verify Title
  const title = await page.title();
  console.log('Page Title:', title);

  // Wait for 3D canvas and brand section
  await page.waitForSelector('#canvas3d');
  await page.waitForTimeout(2000);

  // 1. Normal Operation Screenshot
  console.log('Capturing normal_operation.png...');
  await page.screenshot({ path: path.join(outDir, 'normal_operation.png') });

  // 2. Trigger Pipe Burst on Branch A
  console.log('Triggering Pipe Burst...');
  await page.click('[data-fault="burst"]');
  await page.waitForTimeout(1500);
  console.log('Capturing fault_pipe_burst.png...');
  await page.screenshot({ path: path.join(outDir, 'fault_pipe_burst.png') });

  // 3. Trigger Trench Cutaway (X-Ray View)
  console.log('Triggering Trench Cutaway...');
  await page.click('#btn-toggle-xray');
  await page.waitForTimeout(1000);
  console.log('Capturing trench_cutaway_xray.png...');
  await page.screenshot({ path: path.join(outDir, 'trench_cutaway_xray.png') });

  // Turn off burst and xray
  await page.click('[data-fault="burst"]');
  await page.click('#btn-toggle-xray');

  // 4. Trigger Monsoon Contamination
  console.log('Triggering Monsoon Contamination...');
  await page.click('[data-fault="rain"]');
  await page.waitForTimeout(1500);
  console.log('Capturing fault_contamination.png...');
  await page.screenshot({ path: path.join(outDir, 'fault_contamination.png') });

  await browser.close();
  console.log('SUCCESS: All 4 screenshots captured successfully!');
}

main().catch(err => {
  console.error('Smoke test error:', err);
  process.exit(1);
});
