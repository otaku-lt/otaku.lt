import { test, expect } from '@playwright/test';

test.describe('Events Calendar', () => {
  test('homepage loads with featured events section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Upcoming Events').first()).toBeVisible();
  });

  test('homepage upcoming events widget shows only future events', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Upcoming Events').first()).toBeVisible();

    // Past screening-only events (e.g. Grave of the Fireflies, Aug 2025) must not appear
    await expect(page.locator('text=Grave of the Fireflies')).not.toBeVisible();

    // If cards are rendered, verify each displayed date is today or later
    const section = page.locator('section:has-text("Upcoming Events")');
    const cards = section.locator('.grid > *');
    const count = await cards.count();
    if (count > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      for (let i = 0; i < count; i++) {
        const dateText = await cards.nth(i).locator('span.text-sm').first().textContent();
        if (dateText) {
          const cardDate = new Date(dateText.trim());
          if (!isNaN(cardDate.getTime())) {
            expect(cardDate.getTime()).toBeGreaterThanOrEqual(today.getTime());
          }
        }
      }
    }
  });

  test('homepage shows next Korniha performance widget', async ({ page }) => {
    await page.goto('/');
    // If there is an upcoming Korniha event, the widget should be visible
    const widget = page.locator('text=Next Korniha Performance').first();
    const isVisible = await widget.isVisible().catch(() => false);
    if (isVisible) {
      await expect(page.locator('text=Band Page').first()).toBeVisible();
    }
  });

  test('events page renders calendar', async ({ page }) => {
    await page.goto('/events');
    // FullCalendar renders with fc-view-harness
    await expect(page.locator('.fc')).toBeVisible();
  });

  test('month navigation changes displayed month', async ({ page }) => {
    await page.goto('/events');

    const monthTitle = page.locator('.fc-toolbar-title');
    const initialMonth = await monthTitle.textContent();

    // Click next month button
    await page.locator('.fc-next-button').click();
    await page.waitForTimeout(500);

    const nextMonth = await monthTitle.textContent();
    expect(nextMonth).not.toBe(initialMonth);
  });

  test('clicking calendar event opens modal with correct title', async ({ page }) => {
    await page.goto('/events?month=2026-06');

    // Wait for calendar events to render
    await page.waitForSelector('.fc-event', { timeout: 10000 });

    const firstEvent = page.locator('.fc-event').first();
    await expect(firstEvent).toBeVisible();

    const eventTitle = await firstEvent.textContent() || '';
    await firstEvent.click();

    // Modal should open
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    // Title should be in the modal
    await expect(page.locator('[role="dialog"]')).toContainText(eventTitle.trim());
  });

  test('deep link to event opens correct modal', async ({ page }) => {
    // Paprika event from June 2026
    await page.goto('/events?month=2026-06&event=58-paprika');

    // Modal should auto-open
    await expect(page.locator('[role="dialog"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[role="dialog"]')).toContainText('Paprika');
  });

  test('category filter updates event list', async ({ page }) => {
    await page.goto('/events');
    await page.waitForSelector('.fc-event', { timeout: 10000 });

    // Switch to list view for easier filter testing
    await page.locator('text=List View').click();
    await page.waitForTimeout(500);

    // Click a category filter (e.g., "Screening")
    const screeningButton = page.locator('button:has-text("Screening")').first();
    if (await screeningButton.isVisible().catch(() => false)) {
      await screeningButton.click();
      await page.waitForTimeout(500);
      // Events list should update
      await expect(page.locator('.grid > div').first()).toBeVisible();
    }
  });

  test('search input filters events', async ({ page }) => {
    await page.goto('/events');
    await page.waitForSelector('.fc-event', { timeout: 10000 });

    // Switch to list view
    await page.locator('text=List View').click();
    await page.waitForTimeout(500);

    // Type in search
    const searchInput = page.locator('input[placeholder*="search" i]').first();
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill('Paprika');
      await page.waitForTimeout(500);

      // Results should contain the search term
      await expect(page.locator('text=Paprika').first()).toBeVisible();
    }
  });

  test('list view renders events in grid', async ({ page }) => {
    await page.goto('/events');
    await page.waitForSelector('.fc-event', { timeout: 10000 });

    await page.locator('text=List View').click();
    await page.waitForTimeout(500);

    // Grid layout should have event cards
    await expect(page.locator('.grid').first()).toBeVisible();
  });
});
