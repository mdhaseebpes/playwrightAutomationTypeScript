const { test, expect } = require('@playwright/test');

test('Browser navigation ', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.goto('https://google.com');
  await page.goBack();
  await page.goForward();
});

test.only('Browser Pop up mouser hover and frame validation', async ({
  page,
}) => {
  page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  //Hidden text box
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden();

  //Alert pop up
  page.on('dialog', dialog => dialog.accept());
  //page.on('dialog', dialog => dialog.dismiss());
  await page.locator('#alertbtn').click();

  //mouse hover
  await page.locator('#mousehover').hover();
  await page.getByRole('link', { name: 'Top' }).click();
  //await page.getByRole('link', { name: 'Reload' }).click();

  //iframe
  const framePage = page.frameLocator('#courses-iframe');
  //await framePage.getByRole('link', { name: 'lifetime-access' }).click();
  await framePage.locator('li a[href*="lifetime-access"]:visible').click();

  //users subscription
  const userDetails = await framePage.locator('.text h2').textContent();
  const userCount = await userDetails.split(' ')[1];
  console.log(`User subscription ${userCount}`);
});
