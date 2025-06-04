// File: tests/apiTest.spec.js

const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/apiUtils');

let orderId;
let webContext;

const orderPayload = {
  orders: [{ country: 'India', productOrderedId: '67a8df56c0d3e6622a297ccd' }],
};

test.beforeAll(async ({ browser }) => {
  const email = 'mdhaseebpes@gmail.com';
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill('Cloudone12@');
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await context.storageState({ path: 'state.json' });
  webContext = await browser.newContext({ storageState: 'state.json' });
});

test.beforeEach(async () => {});

test('login via api and order ', async () => {
  const email = 'xxxxxxxx@gmail.com';
  const productName = 'IPHONE 13 PRO';

  const page = await webContext.newPage();
  const products = page.locator('.card-body');

  await page.goto('https://rahulshettyacademy.com/client');

  // Wait for page to load products
  await page.waitForLoadState('networkidle');
  await products.first().waitFor({ state: 'visible', timeout: 10000 });

  // Add specific product to cart
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    const productTitle = await products.nth(i).locator('b').textContent();
    if (productTitle?.trim() === productName) {
      await products.nth(i).locator('text=Add To Cart').click();
      break;
    }
  }

  // Go to cart and verify product
  await page.locator("[routerlink*='cart']").click();
  await page
    .locator('div li')
    .first()
    .waitFor({ state: 'visible', timeout: 5000 });

  const productExist = await page
    .locator(`h3:has-text("${productName}")`)
    .isVisible();
  expect(productExist).toBeTruthy();

  // Proceed to checkout
  await page.locator('text=Checkout').click();

  // Fill in payment details
  await page.locator('(//input[@type="text"])[2]').fill('123');
  await page.locator('(//input[@type="text"])[3]').fill('Has');

  await page
    .locator('[placeholder="Select Country"]')
    .pressSequentially('ind', { delay: 100 });

  const dropdownOptions = page.locator(
    '//section[@class="ta-results list-group ng-star-inserted"]//button'
  );

  // Ensure dropdown is loaded and visible
  await expect(dropdownOptions.first()).toBeVisible({ timeout: 10000 });

  const optionsCount = await dropdownOptions.count();

  for (let i = 0; i < optionsCount; ++i) {
    const option = dropdownOptions.nth(i);
    await expect(option).toBeVisible(); // Make sure it's visible before accessing text
    const text = await option.textContent();

    if (text?.trim() === 'India') {
      await option.click();
      break;
    }
  }

  // Verify user email appears in summary
  await expect(page.locator('.user__name [type="text"]').first()).toHaveText(
    email
  );

  // Submit order
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.locator('a.action__submit').click(),
  ]);

  // Wait for confirmation message and validate
  const confirmationMessage = page.locator('.hero-primary');
  await confirmationMessage.waitFor({ state: 'visible', timeout: 10000 });
  await expect(confirmationMessage).toHaveText(/Thank.?you for the order/i);

  //order id
  const orderID = await page
    .locator('.em-spacer-1 .ng-star-inserted')
    .textContent();
  console.log(orderID);

  //orders
  await page.locator('[routerlink*="myorders"]').first().click();

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

test('login via API and add product to cart ', async () => {
  const productName = 'IPHONE 13 PRO';

  const page = await webContext.newPage();
  const products = page.locator('.card-body');

  await page.goto('https://rahulshettyacademy.com/client');
  // Wait for page to load products
  await page.waitForLoadState('networkidle');
  await products.first().waitFor({ state: 'visible', timeout: 10000 });

  // Add specific product to cart
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    const productTitle = await products.nth(i).locator('b').textContent();
    if (productTitle?.trim() === productName) {
      await products.nth(i).locator('text=Add To Cart').click();
      break;
    }
  }
});
