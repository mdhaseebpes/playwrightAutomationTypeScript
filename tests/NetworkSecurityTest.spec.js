import { expect, request, test } from '@playwright/test';

test('Network security test', async ({ page }) => {
  const products = page.locator('.card-body');

  // Navigate to login
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('mdhaseebpes@gmail.com');
  await page.locator('#userPassword').fill('Cloudone12@');
  await page.locator("[value='Login']").click();

  // Wait for page to load products
  await page.waitForLoadState('networkidle');
  await products.first().waitFor({ state: 'visible', timeout: 10000 });

  await page.locator('[routerLink*= "myorders"]').click();

  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    async route => {
      route.continue({
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6',
      });
    }
  );
  await page.locator('button:has-text("View")').first().click();
  await expect(page.locator('p').last()).toHaveText(
    'You are not authorize to view this order'
  );
});

test.only('Network abort test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // to block any css request while execution
  // page.route('**/*.css', route => route.abort());
  // to block any images display while execution
  page.route('**/*.{png,jpeg,jpg}', route => route.abort());

  //to get all request and response trigger during execution
  page.on('request', request => console.log(request.url()));
  page.on('response', response =>
    console.log(response.url(), response.status())
  );

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  console.log(await page.title());

  const signInBtn = page.locator('#signInBtn');
  //valid user
  await page.locator('input#username').fill('rahulshettyacademy');
  await page.locator('[name="password"]').fill('learning');
  await page.locator('#signInBtn').click();
  await signInBtn.click();

  //verify
  console.log(await page.locator('.card-body a').nth(0).textContent());
  console.log(await page.locator('.card-body a').first().textContent());
  console.log(await page.locator('.card-body a').nth(1).textContent());
  console.log(await page.locator('.card-body a').last().textContent());
});
