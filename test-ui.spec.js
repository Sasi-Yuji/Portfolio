import { test } from '@playwright/test';

test('verify footer hover effect', async ({ page }) => {
  await page.goto('http://localhost:4173/');

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Wait a bit for everything to settle
  await page.waitForTimeout(2000);

  // Take a screenshot
  await page.screenshot({ path: 'footer-hover.png', fullPage: true });
});
