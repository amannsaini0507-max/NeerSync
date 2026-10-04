import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('Starting Playwright screenshot capture for integrated demo...');
  const artifactDir = 'C:/Users/saksh/.gemini/antigravity/brain/c8f565b9-a5b9-4bcb-99e3-3600c912c0ed';
  const localDir = path.resolve('./screenshots');

  for (const d of [artifactDir, localDir]) {
    if (!fs.existsSync(d)) {
      fs.mkdirSync(d, { recursive: true });
    }
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--use-gl=swiftshader']
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 950 }
  });

  // 1. Visit GP Dashboard (Normal State)
  console.log('Navigating to http://localhost:3000/dashboard...');
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('Capturing gp_dashboard_normal.png...');
  await page.screenshot({ path: path.join(artifactDir, 'gp_dashboard_normal.png') });
  await page.screenshot({ path: path.join(localDir, 'gp_dashboard_normal.png') });

  // 2. Click "💥 Pipe Burst (Branch A)" in the Simulation Control Studio
  console.log('Triggering Pipe Burst scenario in Simulation Studio...');
  const burstButton = page.locator('text=💥 Pipe Burst (Branch A)');
  if (await burstButton.count() > 0) {
    await burstButton.first().click();
    await page.waitForTimeout(2500);
  }

  console.log('Capturing gp_dashboard_burst_active.png...');
  await page.screenshot({ path: path.join(artifactDir, 'gp_dashboard_burst_active.png') });
  await page.screenshot({ path: path.join(localDir, 'gp_dashboard_burst_active.png') });

  // 3. Navigate to 3D Digital Twin Page
  console.log('Navigating to http://localhost:3000/twin...');
  await page.goto('http://localhost:3000/twin', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000); // Allow 3D canvas and WebGL shaders to initialize

  console.log('Capturing digital_twin_3d_integrated.png...');
  await page.screenshot({ path: path.join(artifactDir, 'digital_twin_3d_integrated.png') });
  await page.screenshot({ path: path.join(localDir, 'digital_twin_3d_integrated.png') });

  // 4. Visit Direct Standalone 3D Village Twin (fullscreen)
  console.log('Navigating to http://localhost:3000/twin3d/index.html...');
  await page.goto('http://localhost:3000/twin3d/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  console.log('Capturing standalone_village_twin3d.png...');
  await page.screenshot({ path: path.join(artifactDir, 'standalone_village_twin3d.png') });
  await page.screenshot({ path: path.join(localDir, 'standalone_village_twin3d.png') });

  await browser.close();
  console.log('SUCCESS: All final demo screenshots captured and saved to artifacts!');
}

main().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
