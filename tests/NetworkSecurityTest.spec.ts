import { expect, test } from '@playwright/test';

test('Network security test', async ({ page }) => {
  const products = page.locator('.card-body');

  // Navigate to login
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('xxxxxxxx@gmail.com');
  await page.locator('#userPassword').fill('xxxxxx12@');
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
