const { test, expect } = require('@playwright/test');

test('calendar validation', async ({ page }) => {
  const monthNumber = '9';
  const date = '2';
  const year = '1987';

  const expectedList = [monthNumber, date, year];

  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
  await page.locator('.react-date-picker__inputGroup').click();
  await page
    .locator('.react-calendar__navigation__label__labelText--from')
    .click();
  await page
    .locator('.react-calendar__navigation__label__labelText--from')
    .click();

  //select year
  const previousYearNavigation = page.locator(
    '.react-calendar__navigation__prev-button'
  );
  let yearFound = false;

  for (let i = 0; i < 10; i++) {
    //wait for years to be visible
    await page.waitForSelector('.react-calendar__decade-view__years__year');
    const yearsCalendar = page.locator(
      '.react-calendar__decade-view__years__year'
    );
    const yearsCount = await yearsCalendar.count();
    console.log(yearsCount);

    for (let j = 0; j < yearsCount; j++) {
      let actualYear = (await yearsCalendar.nth(j).textContent())?.trim();
      console.log(actualYear);
      if (actualYear === year) {
        await yearsCalendar.nth(j).click();
        console.log(`clicking on ${actualYear}`);
        yearFound = true;
        break;
      }
    }
    if (yearFound) break;
    await previousYearNavigation.click();
    await page.waitForTimeout(300);
  }

  //select month
  await page
    .locator('.react-calendar__year-view__months__month')
    .nth(Number(monthNumber) - 1)
    .click();

  //select date
  await page
    .locator("//abbr[text()='" + date + "']")
    .first()
    .click();

  const inputs = page.locator('.react-date-picker__inputGroup input');
  const actualValues = [];

  const count = await inputs.count();
  for (let i = 0; i < count; i++) {
    const value = await inputs.nth(i).getAttribute('value');
    actualValues.push(value?.trim());
    console.log(`Input ${i}: ${value}`);
  }

  console.log('Actual values:', actualValues);

  // Verify if expected values exist in actual input fields
  expect(actualValues).toEqual(
    expect.arrayContaining([monthNumber, date, year])
  );
});
