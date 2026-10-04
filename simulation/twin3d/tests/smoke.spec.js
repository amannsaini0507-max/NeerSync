/**
 * NeerSync 3D Village Digital Twin - Playwright E2E Smoke Test
 * Tests page load, WebGL canvas, controls, fault toggling, and captures screenshots.
 */

import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('NeerSync 3D Village Twin E2E Smoke Test', () => {
  test('renders 3D twin, toggles faults, verifies alerts, and captures screenshots', async ({ page }) => {
    // 1. Load application
    await page.goto('/');

    // Verify Title & Canvas
    await expect(page).toHaveTitle(/NeerSync: 3D Village Water Digital Twin/);
    const canvas = page.locator('#canvas3d');
    await expect(canvas).toBeVisible();

    // Verify Brand title
    const brandTitle = page.locator('.brand-title');
    await expect(brandTitle).toHaveText('NeerSync Village Twin');

    // Wait for initial render to stabilize
    await page.waitForTimeout(2000);

    // Screenshot 1: Normal Village Operation
    await page.screenshot({ path: 'screenshots/normal_operation.png', fullPage: true });

    // 2. Toggle Pipe Burst on Branch A
    const burstBtn = page.locator('[data-fault="burst"]');
    await burstBtn.click();
    await expect(burstBtn).toHaveClass(/active/);

    // Wait for burst alert to appear in alert feed
    await page.waitForTimeout(1500);
    const alertCard = page.locator('.alert-card');
    await expect(alertCard.first()).toBeVisible();
    await expect(alertCard.first()).toContainText('PIPE BURST');
    await expect(alertCard.first()).toContainText('Branch A');

    // Screenshot 2: Catastrophic Burst Fountain
    await page.screenshot({ path: 'screenshots/fault_pipe_burst.png', fullPage: true });

    // 3. Toggle Trench Cutaway (X-Ray View)
    const xrayBtn = page.locator('#btn-toggle-xray');
    await xrayBtn.click();
    await expect(xrayBtn).toHaveClass(/active/);
    await page.waitForTimeout(1000);

    // Screenshot 3: Trench Cutaway (X-Ray) Subterranean View
    await page.screenshot({ path: 'screenshots/trench_cutaway_xray.png', fullPage: true });

    // Turn off burst and xray
    await burstBtn.click();
    await xrayBtn.click();

    // 4. Toggle Monsoon Contamination
    const rainBtn = page.locator('[data-fault="rain"]');
    await rainBtn.click();
    await expect(rainBtn).toHaveClass(/active/);
    await page.waitForTimeout(1500);

    // Verify Water Quality alert
    await expect(page.locator('.alert-card').first()).toContainText('WATER QUALITY');

    // Screenshot 4: Monsoon Runoff Contamination
    await page.screenshot({ path: 'screenshots/fault_contamination.png', fullPage: true });
  });
});
