const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
//Json >> String >> object
const dataset = JSON.parse(JSON.stringify(require('../utils/testData.json')));
const dataArrayset = JSON.parse(
  JSON.stringify(require('../utils/testDataArray.json'))
);
const { customtest } = require('../utils/test-base');

test('Client App login', async ({ page }) => {
  const poManager = new POManager(page);
  //js file- Login js, DashboardPage

  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(dataset.username, dataset.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(dataset.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(dataset.productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect('ind', 'India');
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

for (const data of dataArrayset) {
  test(`Client App login with mutiple data ${data.productName}`, async ({
    page,
  }) => {
    const poManager = new POManager(page);
    //js file- Login js, DashboardPage

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect('ind', 'India');
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}

customtest(
  'Custom data test using fixtures',
  async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
    //js file- Login js, DashboardPage

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(
      testDataForOrder.username,
      testDataForOrder.password
    );
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect('ind', 'India');
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  }
);
