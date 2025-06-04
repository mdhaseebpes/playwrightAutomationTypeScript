const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');
const { CartPage } = require('../pageObjects/cartPage');
const { PaymentPage } = require('../pageObjects/PaymentPage');

test.only('@Web Client App login', async ({ page }) => {
  const username = 'mdhaseebpes@gmail.com';
  const password = 'Cloudone12@';
  const productName = 'IPHONE 13 PRO';

  // Navigate to login
  const loginPage = new LoginPage(page);
  await loginPage.goToUrl();
  await loginPage.validLogin(username, password);

  // Wait for page to load products
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.searchAddProduct(productName);

  // Go to cart and verify product
  const cartPage = new CartPage(page);
  await cartPage.goToCart();
  await cartPage.productExist(productName);
  await cartPage.clickCheckOut();

  const payment = new PaymentPage(page);
  await payment.cardPersonalInformation();
  await payment.shippingInformation('India', username);

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

test('UI controls', async () => {});
