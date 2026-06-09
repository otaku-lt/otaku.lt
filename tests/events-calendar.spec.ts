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

  test('all events button resets filters and shows total events', async ({ page }) => {
    await page.goto('/events');
    await page.waitForSelector('.fc-event', { timeout: 10000 });

    // Switch to list view
    await page.locator('text=List View').click();
    await page.waitForTimeout(500);

    // Click Upcoming first to set a filter
    await page.locator('button:has-text("Upcoming")').first().click();
    await page.waitForTimeout(500);

    // Click All Events to reset
    const allEventsButton = page.locator('button:has-text("All Events")').first();
    await allEventsButton.click();
    await page.waitForTimeout(500);

    // Extract expected count from button text
    const buttonText = await allEventsButton.textContent();
    const countMatch = buttonText?.match(/\((\d+)\)/);
    const expectedCount = countMatch ? parseInt(countMatch[1], 10) : 0;

    // Count visible event cards
    const cardCount = await page.locator('.max-w-6xl .grid.gap-6 > div').count();
    expect(cardCount).toBe(expectedCount);

    if (expectedCount === 0) {
      await expect(page.locator('text=No events found').first()).toBeVisible();
    }

    // All Events button should be highlighted
    await expect(allEventsButton).toHaveClass(/bg-primary/);
  });

  test('upcoming button shows only upcoming events and count matches', async ({ page }) => {
    await page.goto('/events');
    await page.waitForSelector('.fc-event', { timeout: 10000 });

    // Switch to list view
    await page.locator('text=List View').click();
    await page.waitForTimeout(500);

    const upcomingButton = page.locator('button:has-text("Upcoming")').first();

    // Extract expected count from button text
    const buttonText = await upcomingButton.textContent();
    const countMatch = buttonText?.match(/\((\d+)\)/);
    const expectedCount = countMatch ? parseInt(countMatch[1], 10) : 0;

    // Click Upcoming
    await upcomingButton.click();
    await page.waitForTimeout(500);

    // Count visible event cards
    const cardCount = await page.locator('.max-w-6xl .grid.gap-6 > div').count();
    expect(cardCount).toBe(expectedCount);

    if (expectedCount === 0) {
      await expect(page.locator('text=No events found').first()).toBeVisible();
    } else {
      // Verify every visible card has a future date
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const cards = page.locator('.max-w-6xl .grid.gap-6 > div');
      for (let i = 0; i < cardCount; i++) {
        const dateText = await cards.nth(i).locator('span.text-sm').first().textContent();
        if (dateText) {
          const cardDate = new Date(dateText.trim());
          if (!isNaN(cardDate.getTime())) {
            expect(cardDate.getTime()).toBeGreaterThanOrEqual(today.getTime());
          }
        }
      }
    }

    // Upcoming button should be highlighted
    await expect(upcomingButton).toHaveClass(/bg-primary/);
  });

  test('upcoming button toggles on and off', async ({ page }) => {
    await page.goto('/events');
    await page.waitForSelector('.fc-event', { timeout: 10000 });

    // Switch to list view
    await page.locator('text=List View').click();
    await page.waitForTimeout(500);

    const allEventsButton = page.locator('button:has-text("All Events")').first();
    const upcomingButton = page.locator('button:has-text("Upcoming")').first();

    // Get total count
    const allText = await allEventsButton.textContent();
    const allMatch = allText?.match(/\((\d+)\)/);
    const totalCount = allMatch ? parseInt(allMatch[1], 10) : 0;

    // Click Upcoming
    await upcomingButton.click();
    await page.waitForTimeout(500);
    await expect(upcomingButton).toHaveClass(/bg-primary/);

    // Click Upcoming again to toggle off
    await upcomingButton.click();
    await page.waitForTimeout(500);

    // Should be back to All Events
    await expect(allEventsButton).toHaveClass(/bg-primary/);
    const cardCount = await page.locator('.max-w-6xl .grid.gap-6 > div').count();
    expect(cardCount).toBe(totalCount);
  });

  test('category button count matches displayed cards', async ({ page }) => {
    await page.goto('/events');
    await page.waitForSelector('.fc-event', { timeout: 10000 });

    // Switch to list view
    await page.locator('text=List View').click();
    await page.waitForTimeout(500);

    // Test each category that has events
    const categories = ['Gaming', 'Music/Concerts', 'Movie Screenings', 'Workshops', 'Meetups', 'Conventions', 'Camping', 'Social Events', 'Other'];

    for (const label of categories) {
      const button = page.locator('button', { hasText: new RegExp(`^${label}`) }).first();
      const isVisible = await button.isVisible().catch(() => false);
      if (!isVisible) continue;

      const buttonText = await button.textContent();
      const countMatch = buttonText?.match(/\((\d+)\)/);
      const expectedCount = countMatch ? parseInt(countMatch[1], 10) : 0;

      if (expectedCount === 0) continue; // Skip empty categories

      await button.click();
      await page.waitForTimeout(500);

      const cardCount = await page.locator('.max-w-6xl .grid.gap-6 > div').count();
      expect(cardCount).toBe(expectedCount);

      // Button should be highlighted
      await expect(button).toHaveClass(/bg-primary/);

      // Reset to all events before next category
      const allEventsButton = page.locator('button:has-text("All Events")').first();
      await allEventsButton.click();
      await page.waitForTimeout(300);
    }
  });

  test('stacked upcoming + category filter shows intersection', async ({ page }) => {
    await page.goto('/events');
    await page.waitForSelector('.fc-event', { timeout: 10000 });

    // Switch to list view
    await page.locator('text=List View').click();
    await page.waitForTimeout(500);

    // Click Upcoming first
    const upcomingButton = page.locator('button:has-text("Upcoming")').first();
    await upcomingButton.click();
    await page.waitForTimeout(500);

    // Find a category with upcoming events
    const categories = ['Gaming', 'Music/Concerts', 'Movie Screenings', 'Workshops', 'Meetups', 'Conventions'];
    for (const label of categories) {
      const button = page.locator('button', { hasText: new RegExp(`^${label}`) }).first();
      const isVisible = await button.isVisible().catch(() => false);
      if (!isVisible) continue;

      const buttonText = await button.textContent();
      const countMatch = buttonText?.match(/\((\d+)\)/);
      const count = countMatch ? parseInt(countMatch[1], 10) : 0;

      if (count > 0) {
        // Click the category
        await button.click();
        await page.waitForTimeout(500);

        // Both Upcoming and category buttons should be highlighted
        await expect(upcomingButton).toHaveClass(/bg-primary/);
        await expect(button).toHaveClass(/bg-primary/);

        // Card count should match the category button count (which reflects upcoming + category)
        const cardCount = await page.locator('.max-w-6xl .grid.gap-6 > div').count();
        expect(cardCount).toBe(count);

        // All cards should still be upcoming
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const cards = page.locator('.max-w-6xl .grid.gap-6 > div');
        for (let i = 0; i < cardCount; i++) {
          const dateText = await cards.nth(i).locator('span.text-sm').first().textContent();
          if (dateText) {
            const cardDate = new Date(dateText.trim());
            if (!isNaN(cardDate.getTime())) {
              expect(cardDate.getTime()).toBeGreaterThanOrEqual(today.getTime());
            }
          }
        }

        break; // Only test one stacked category
      }
    }
  });

  test('category buttons replace each other (no multi-category)', async ({ page }) => {
    await page.goto('/events');
    await page.waitForSelector('.fc-event', { timeout: 10000 });

    // Switch to list view
    await page.locator('text=List View').click();
    await page.waitForTimeout(500);

    // Find two categories that have events
    const gamingButton = page.locator('button:has-text("Gaming")').first();
    const screeningsButton = page.locator('button:has-text("Movie Screenings")').first();

    const gamingVisible = await gamingButton.isVisible().catch(() => false);
    const screeningsVisible = await screeningsButton.isVisible().catch(() => false);

    if (!gamingVisible || !screeningsVisible) {
      test.skip();
      return;
    }

    const gamingText = await gamingButton.textContent();
    const gamingMatch = gamingText?.match(/\((\d+)\)/);
    const gamingCount = gamingMatch ? parseInt(gamingMatch[1], 10) : 0;

    const screeningsText = await screeningsButton.textContent();
    const screeningsMatch = screeningsText?.match(/\((\d+)\)/);
    const screeningsCount = screeningsMatch ? parseInt(screeningsMatch[1], 10) : 0;

    if (gamingCount === 0 || screeningsCount === 0) {
      test.skip();
      return;
    }

    // Click Gaming
    await gamingButton.click();
    await page.waitForTimeout(500);
    await expect(gamingButton).toHaveClass(/bg-primary/);

    // Click Screenings - should replace Gaming
    await screeningsButton.click();
    await page.waitForTimeout(500);
    await expect(screeningsButton).toHaveClass(/bg-primary/);

    // Gaming should no longer be highlighted
    await expect(gamingButton).not.toHaveClass(/bg-primary/);

    // Should show screenings count
    const cardCount = await page.locator('.max-w-6xl .grid.gap-6 > div').count();
    expect(cardCount).toBe(screeningsCount);
  });

  test('clicking category from calendar view switches to list view', async ({ page }) => {
    await page.goto('/events');
    await page.waitForSelector('.fc-event', { timeout: 10000 });

    // Verify we're in calendar view
    await expect(page.locator('.fc')).toBeVisible();

    // Find a category button with events
    const gamingButton = page.locator('button:has-text("Gaming")').first();
    const isVisible = await gamingButton.isVisible().catch(() => false);
    if (!isVisible) {
      test.skip();
      return;
    }

    const buttonText = await gamingButton.textContent();
    const countMatch = buttonText?.match(/\((\d+)\)/);
    const count = countMatch ? parseInt(countMatch[1], 10) : 0;
    if (count === 0) {
      test.skip();
      return;
    }

    // Click category
    await gamingButton.click();
    await page.waitForTimeout(800);

    // List view should be active
    const listButton = page.locator('button:has-text("List View")').first();
    await expect(listButton).toHaveClass(/bg-primary/);

    // Grid should be visible with correct count
    const cardCount = await page.locator('.max-w-6xl .grid.gap-6 > div').count();
    expect(cardCount).toBe(count);
  });
});
