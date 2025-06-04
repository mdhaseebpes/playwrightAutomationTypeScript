import { test, expect } from '@playwright/test';

test('Browser Pop up mouser hover and frame validation', async ({ page }) => {
  page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  //Hidden text box
  await expect(page.locator('#displayed-text')).toBeVisible();

  await page.locator('#hide-textbox').click();
  //taking screen shot of entire page at specific step
  await page.screenshot({ path: 'screenshot.png' });
  await expect(page.locator('#displayed-text')).toBeHidden();

  //Alert pop up
  page.on('dialog', dialog => dialog.accept());
  //page.on('dialog', dialog => dialog.dismiss());
  await page.locator('#alertbtn').click();
  await page.locator('#alertbtn').screenshot({ path: 'partialScreenshot.png' });
});

test('Visual test compare images', async ({ page }) => {
  page.goto('https://flightware.com/');
  expect(await page.screenshot()).toMatchSnapshot('flightHomeScreen.png');
});

test('Visual test compare images 02', async ({ page }) => {
  page.goto('https://google.com/');
  expect(await page.screenshot()).toMatchSnapshot('HomeScreen.png');
});
