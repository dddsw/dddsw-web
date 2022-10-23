import { test, expect } from '@playwright/test';

test('Can navigate to About from Home by clicking nav link', async ({ page }) => {
  // Go to Home
  await page.goto('http://127.0.0.1:5173/');

  // Click About link
  await page.locator('.nav-button a[href="/about"]').click();
  await expect(page).toHaveURL('http://127.0.0.1:5173/about');
});

test('Can navigate to Home from About by clicking logo', async ({ page }) => {
  // Go to About
  await page.goto('http://127.0.0.1:5173/about');

  // Click logo
  await page.locator('img[class~="logo"]').click();
  await expect(page).toHaveURL('http://127.0.0.1:5173/');
});