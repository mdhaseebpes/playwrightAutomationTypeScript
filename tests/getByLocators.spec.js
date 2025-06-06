import { test, expect } from '@playwright/test';

test('Playwright special locators', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel('Check me out if you Love IceCreams!').check();
  await page.getByLabel('Employed').check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByPlaceholder('Password').fill('one@123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page
    .getByText('The Form has been submitted successfully!.')
    .isVisible();
  await page.getByRole('link', { name: 'Shop' }).click();
  //filter ,get by role , get by text

  await page
    .locator('app-card')
    .filter({ hasText: 'Blackberry' })
    .getByRole('button', { name: 'Add' })
    .click();
});

test.only('Client App login', async ({ page }) => {
  const email = 'mdxxxxxxx@gmail.com';
  const products = page.locator('.card-body');

  await page.goto('https://rahulshettyacademy.com/client');
  await page.getByPlaceholder('email@example.com').fill(email);
  await page.getByPlaceholder('enter your passsword').fill('xxxxxx12@');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor();

  await page
    .locator('.card-body')
    .filter({ hasText: 'ZARA COAT 3' })
    .getByRole('button', { name: 'Add to Cart' })
    .click();

  await page
    .getByRole('listitem')
    .getByRole('button', { name: 'Cart' })
    .click();

  //await page.pause();
  await page.locator('div li').first().waitFor();
  await expect(page.getByText('ZARA COAT 3')).toBeVisible();

  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByPlaceholder('Select Country').pressSequentially('ind');

  await page.getByRole('button', { name: 'India' }).nth(1).click();
  await page.getByText('PLACE ORDER').click();

  await expect(page.getByText('Thankyou for the order.')).toBeVisible();

  //order id
  const orderID = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent();
  console.log(orderID);

  //orders
  await page.getByRole('button', { name: 'ORDERS' }).first().click();

  const orderS = page.locator('tbody tr');
  await orderS.first().waitFor({ state: 'visible', timeout: 10000 });
  const ordersCount = await orderS.count();
  console.log('Order count:', ordersCount);

  for (let i = 0; i < ordersCount; ++i) {
    //await page.pause();
    const rowOrderIds = await orderS.nth(i).locator('th').textContent();
    console.log(rowOrderIds);
    if (orderID.includes(rowOrderIds)) {
      await orderS.nth(i).locator('button').first().click();
      break;
    }
  }
  // const orderSummaryPage = page.locator('text=order summary');
  // await orderSummaryPage.waitFor();
  // expect(orderSummaryPage).isVisible();

  const orderIdDetails = await page.locator('.col-text').textContent();
  expect(orderID.includes(orderIdDetails)).toBeTruthy();
});
