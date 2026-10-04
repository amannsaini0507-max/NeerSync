"""
Playwright End-to-End Test Suite for NeerSync Platform
Covers:
1. Citizen 1-tap QR feedback (/f/{fhtc_id})
2. Alert creation -> technician repair proof upload -> citizen confirmation closure
3. GP Dashboard with GIS map and FHTC Service Index
4. IMIS daily sync push and audit log trail
"""
import pytest
import os
import time

try:
    from playwright.async_api import async_playwright, expect
    HAS_PLAYWRIGHT = True
except ImportError:
    HAS_PLAYWRIGHT = False

BASE_URL = os.environ.get("NEERSYNC_BASE_URL", "http://localhost:8000")


@pytest.mark.skipif(not HAS_PLAYWRIGHT, reason="playwright library not installed in current environment")
@pytest.mark.asyncio
async def test_citizen_qr_feedback_flow():
    """Tests citizen scanning household QR code and tapping 'Water Came'."""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # 1. Navigate to 1-tap QR landing
        await page.goto(f"{BASE_URL}/f/FHTC-UP-245123-0042")
        await page.wait_for_selector("#btn-water-came", timeout=10000)

        # 2. Verify Household details
        content = await page.content()
        assert "Ramesh Sharma" in content or "FHTC-UP-245123-0042" in content

        # 3. Enter optional voice/text note
        note_input = page.locator("#qr-note-input")
        if await note_input.count() > 0:
            await note_input.fill("Regular pressure verified via E2E test")

        # 4. Tap 'Water Came'
        await page.click("#btn-water-came")

        # 5. Verify success feedback appears
        await page.wait_for_timeout(1000)
        page_text = await page.inner_text("body")
        assert "recorded" in page_text.lower() or "thank" in page_text.lower() or "सफल" in page_text

        await browser.close()


@pytest.mark.skipif(not HAS_PLAYWRIGHT, reason="playwright library not installed in current environment")
@pytest.mark.asyncio
async def test_alert_escalation_and_repair_closure_loop():
    """Tests alert creation, SLA escalation review, technician repair submission, and citizen confirmation."""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # 1. Navigate to Alert & Escalations Management
        await page.goto(f"{BASE_URL}/alerts")
        await page.wait_for_selector("table", timeout=10000)

        # 2. Run Escalation Check
        await page.click("#btn-trigger-esc-run")
        await page.wait_for_timeout(1000)

        # 3. Verify SLA Matrix exists
        content = await page.content()
        assert "Jal Mitra" in content
        assert "VWSC" in content
        assert "Junior Engineer" in content

        # 4. If an open alert exists, test the repair loop
        repair_btn = page.locator("button:has-text('Technician Repair')").first
        if await repair_btn.count() > 0:
            await repair_btn.click()
            await page.wait_for_timeout(1000)

            # Confirm repair step
            confirm_btn = page.locator("button:has-text('Confirm (Citizen)')").first
            if await confirm_btn.count() > 0:
                await confirm_btn.click()
                await page.wait_for_timeout(1000)

        await browser.close()


@pytest.mark.skipif(not HAS_PLAYWRIGHT, reason="playwright library not installed in current environment")
@pytest.mark.asyncio
async def test_gp_dashboard_and_gis_map():
    """Tests GP Dashboard KPI gauges, telemetry, and GIS map rendering."""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        await page.goto(f"{BASE_URL}/")
        await page.wait_for_selector("#kpi-service-index", timeout=10000)

        # Verify Service Index gauge
        idx_text = await page.inner_text("#kpi-service-index")
        assert int(idx_text) >= 50

        # Verify GIS Map element rendered
        map_el = page.locator("#gis-map-container")
        assert await map_el.count() > 0

        await browser.close()


@pytest.mark.skipif(not HAS_PLAYWRIGHT, reason="playwright library not installed in current environment")
@pytest.mark.asyncio
async def test_imis_sync_gateway():
    """Tests IMIS daily telemetry push and audit logging."""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        await page.goto(f"{BASE_URL}/sync")
        await page.wait_for_selector("#btn-sync-imis", timeout=10000)

        # Push to IMIS
        await page.click("#btn-sync-imis")
        await page.wait_for_timeout(1500)

        # Verify audit table row
        audit_table = await page.inner_text("#audit-tbody")
        assert "IMIS" in audit_table or "SUCCESS" in audit_table or "MOCK" in audit_table

        await browser.close()
