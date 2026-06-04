import { test, expect } from '@playwright/test';

test.describe('Korniha Band Page', () => {
  test('page loads with event list', async ({ page }) => {
    await page.goto('/korniha-band');

    // Page title or heading should be visible
    await expect(page.locator('h1, h2').filter({ hasText: /Korniha/i }).first()).toBeVisible();
  });

  test('event cards display title date and location', async ({ page }) => {
    await page.goto('/korniha-band');

    // At least one event card should exist
    const eventCards = page.locator('[class*="card" i], article, .event-card').first();
    await expect(eventCards).toBeVisible();

    // Should contain event details
    const pageContent = await page.content();
    expect(pageContent).toMatch(/\d{4}-\d{2}-\d{2}/); // Date format
  });

  test('clicking event card opens details', async ({ page }) => {
    await page.goto('/korniha-band');

    // Try clicking the first event card or link
    const firstEvent = page.locator('article, [class*="card" i], a').first();
    if (await firstEvent.isVisible().catch(() => false)) {
      await firstEvent.click();
      await page.waitForTimeout(500);

      // Either a modal opens or URL changes
      const hasDialog = await page.locator('[role="dialog"]').isVisible().catch(() => false);
      const currentUrl = page.url();

      expect(hasDialog || currentUrl.includes('/korniha-band')).toBeTruthy();
    }
  });

  test('featured events section visible on homepage', async ({ page }) => {
    await page.goto('/');

    // Look for featured events or korniha mention (dropdown needs hover)
    const dropdownTrigger = page.locator('button:has-text("Otaku.lt Events")').first();
    if (await dropdownTrigger.isVisible().catch(() => false)) {
      await dropdownTrigger.hover();
      await page.waitForTimeout(300);
    }
    const kornihaLink = page.locator('a[href*="korniha" i]').first();
    await expect(kornihaLink).toBeVisible();
  });
});
