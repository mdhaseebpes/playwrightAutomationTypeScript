import { expect, test } from '@playwright/test';

test('Invalid user test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  console.log(await page.title());
  await page.locator('input#username').fill('rahulshetty');
  await page.locator('[name="password"]').fill('learning');
  await page.locator('#signInBtn').click();
  console.log(await page.locator('[style*="block"]').textContent());
  await expect(page.locator('[style*="block"]')).toContainText(
    'Icorrect username/password.'
  );
});

test('Login successfull test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const username = page.locator('input#username');
  const signInBtn = page.locator('#signInBtn');

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  console.log(await page.title());

  //   await username.fill('rahulshetty');
  //   await page.locator('[name="password"]').fill('learning');
  //   await signInBtn.click();
  //   console.log(await page.locator('[style*="block"]').textContent());
  //   await expect(page.locator('[style*="block"]')).toContainText(
  //     'Incorrect username/password.'
  //   );

  //valid user
  await username.fill('');
  await username.fill('rahulshettyacademy');
  await page.locator('[name="password"]').fill('learning');
  await signInBtn.click();

  //verify
  console.log(await page.locator('.card-body a').nth(0).textContent());
  console.log(await page.locator('.card-body a').first().textContent());
  console.log(await page.locator('.card-body a').nth(1).textContent());
  console.log(await page.locator('.card-body a').last().textContent());
});

test('UI controls', async ({ page }) => {
  const username = page.locator('input#username');
  const signInBtn = page.locator('#signInBtn');

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  console.log(await page.title());

  //valid user
  await username.fill('rahulshettyacademy');
  await page.locator('[name="password"]').fill('learning');

  //radio button
  const radioButton = page.locator("[value='user']");
  await radioButton.click();
  await expect(radioButton).toBeChecked();

  await page.locator('#okayBtn').click();
  const dropdown = page.locator('select.form-control');
  //drop down
  await dropdown.selectOption('consult');
  const termsCheckBox = page.locator('#terms');
  await termsCheckBox.click();
  await expect(termsCheckBox).toBeChecked();

  await termsCheckBox.uncheck();
  expect(await termsCheckBox.isChecked()).toBeFalsy();

  const documentLink = page.locator('[href*="documents-request"]');
  //checking blinking is getting performed
  await expect(documentLink).toHaveAttribute('class', 'blinkingText');

  //await page.pause();
  await signInBtn.click();
});

test('Child windon handle test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  console.log(await page.title());

  //child window handling
  const documentLink = page.locator('[href*="documents-request"]');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
  ]);

  await expect(newPage).toHaveTitle('RS Academy');
  console.log(newPage.title());

  let text = await newPage.locator('.red').textContent();
  console.log(text);
  const arrayText = await text.split('@');
  const domainEmail = await arrayText[1].split(' ')[0];
  console.log(domainEmail);

  //switching back to parent window
  const username = page.locator('input#username');
  await username.fill(domainEmail);
  //await page.pause();
});

test.skip('Record code generated test ', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('rahul she');
  await page.getByText('tty academy practice page').click();
  await page
    .locator('iframe[name="a-xmysz9gq6nff"]')
    .contentFrame()
    .getByRole('checkbox', { name: "I'm not a robot" })
    .click();
  await page
    .locator('iframe[name="c-xmysz9gq6nff"]')
    .contentFrame()
    .locator('td:nth-child(2)')
    .first()
    .click();
  await page
    .locator('iframe[name="c-xmysz9gq6nff"]')
    .contentFrame()
    .locator('tr:nth-child(2) > td:nth-child(3)')
    .click();
  await page
    .locator('iframe[name="c-xmysz9gq6nff"]')
    .contentFrame()
    .locator('tr:nth-child(2) > td')
    .first()
    .click();
  await page
    .locator('iframe[name="c-xmysz9gq6nff"]')
    .contentFrame()
    .locator('tr:nth-child(3) > td:nth-child(2)')
    .click();
  await page
    .locator('iframe[name="c-xmysz9gq6nff"]')
    .contentFrame()
    .getByRole('button', { name: 'Verify' })
    .click();
  await page.getByRole('link', { name: 'Practice Page Rahul Shetty' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Open Window' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: 'Courses', exact: true }).click();
  await page1.close();
  await page
    .locator('iframe[name="iframe-name"]')
    .contentFrame()
    .locator('#carousel-example-generic')
    .getByRole('link', { name: 'JOIN NOW' })
    .click();
  await page.locator('#dropdown-class-example').selectOption('option2');

  // ---------------------
  await context.close();
  await browser.close();
});
