// File: tests/apiTest.spec.js

const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/apiUtils');

const loginPayLoad = {
  userEmail: 'mdhaseebpes@gmail.com',
  userPassword: 'Cloudone12@',
};
const orderPayload = {
  orders: [{ country: 'India', productOrderedId: '67a8df56c0d3e6622a297ccd' }],
};

let orderId;
let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const apiUtilsInstance = new ApiUtils(apiContext, loginPayLoad);
  token = await apiUtilsInstance.getToken();
  orderId = await apiUtilsInstance.createOrder(orderPayload, token);

  console.log(`order Id : ${orderId}`);
});

test.beforeEach(async () => {});

test('Place order', async ({ page }) => {
  //Bypass login from the app login via api
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);

  const email = 'mdhaseebpes@gmail.com';
  const productName = 'IPHONE 13 PRO';
  const products = page.locator('.card-body');

  // Navigate to login
  await page.goto('https://rahulshettyacademy.com/client');

  // Wait for page to load products
  await page.waitForLoadState('networkidle');
  await products.first().waitFor({ state: 'visible', timeout: 10000 });

  //orders page
  await page.locator('[routerlink*="myorders"]').first().click();

  const orderS = page.locator('tbody tr');
  await orderS.first().waitFor({ state: 'visible', timeout: 10000 });
  const ordersCount = await orderS.count();
  console.log('Order count:', ordersCount);

  for (let i = 0; i < ordersCount; ++i) {
    //await page.pause();
    const rowOrderIds = await orderS.nth(i).locator('th').textContent();
    console.log(rowOrderIds);
    if (orderId.includes(rowOrderIds)) {
      await orderS.nth(i).locator('button').first().click();
      break;
    }
  }
  // const orderSummaryPage = page.locator('text=order summary');
  // await orderSummaryPage.waitFor();
  // expect(orderSummaryPage).isVisible();

  const orderIdDetails = await page.locator('.col-text').textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
