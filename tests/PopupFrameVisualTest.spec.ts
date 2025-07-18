import { test, expect } from '@playwright/test';

//use to run the test parallel  within the test spec file
test.describe.configure({ mode: 'parallel' });
//if  particular test fails while executing and  does not execute rest of the scenarios and skips it
//test.describe.configure({ mode: 'serial' });
test('Popup validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  // await page.goto("http://google.com");
  // await page.goBack();
  // await page.goForward();
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden();
  // await page.pause();
  page.on('dialog', dialog => dialog.accept());
  await page.locator('#confirmbtn').click();
  await page.locator('#mousehover').hover();
  const framesPage = page.frameLocator('#courses-iframe');
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();
  let textCheck: any;
  textCheck = await framesPage.locator('.text h2').textContent();
  console.log(textCheck.split(' ')[1]);
});

test('Screenshot & Visual comparision', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page
    .locator('#displayed-text')
    .screenshot({ path: 'partialScreenshot.png' });
  await page.locator('#hide-textbox').click();
  await page.screenshot({ path: 'screenshot.png' });
  await expect(page.locator('#displayed-text')).toBeHidden();
});
//screenshot -store -> screenshot ->
test('visual', async ({ page }) => {
  await page.goto('https://google.com/');
  expect(await page.screenshot()).toMatchSnapshot('landing.png');
});
