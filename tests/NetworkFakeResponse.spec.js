const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/apiUtils');
const { json } = require('stream/consumers');

const loginPayLoad = {
  userEmail: 'xxxxx@gmail.com',
  userPassword: 'xxxxxx12@',
};

const orderPayload = {
  orders: [{ country: 'India', productOrderedId: '67a8df56c0d3e6622a297ccd' }],
};

const fakePayLoadOrders = { data: [], message: 'No Orders' };

let response;
let orderId;
let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const apiUtilsInstance = new ApiUtils(apiContext, loginPayLoad);
  token = await apiUtilsInstance.getToken();
  orderId = await apiUtilsInstance.createOrder(orderPayload, token);

  console.log(`order Id : ${orderId}`);
});

//create order is success
test('@SP Place the order', async ({ page }) => {
  page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);

  await page.goto('https://rahulshettyacademy.com/client');

  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill({
        response,
        body,
      });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    }
  );

  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*'
  );

  console.log(await page.locator('.mt-4').textContent());
});
