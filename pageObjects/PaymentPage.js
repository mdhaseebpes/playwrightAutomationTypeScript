import { expect } from '@playwright/test';

class PaymentPage {
  constructor(page) {
    this.page = page;
    this.cvvText = page.locator('(//input[@type="text"])[2]');
    this.nameField = page.locator('(//input[@type="text"])[3]');
    this.dropdownOptions = page.locator(
      '//section[@class="ta-results list-group ng-star-inserted"]//button'
    );
    this.emailText = page.locator('.user__name [type="text"]');
  }

  async cardPersonalInformation() {
    // Fill in payment details
    await this.cvvText.fill('123');
    await this.nameField.fill('Has');
  }

  async shippingInformation(country, username) {
    // Fill in payment details
    await this.page
      .locator('[placeholder="Select Country"]')
      .pressSequentially('ind', { delay: 100 });

    // ✅ Ensure dropdown is loaded and visible
    await expect(this.dropdownOptions.first()).toBeVisible({ timeout: 10000 });

    const optionsCount = await this.dropdownOptions.count();

    for (let i = 0; i < optionsCount; ++i) {
      const option = this.dropdownOptions.nth(i);
      await expect(option).toBeVisible(); // Make sure it's visible before accessing text
      const text = await option.textContent();

      if (text?.trim() === country) {
        await option.click();
        break;
      }
    }

    // Verify user email appears in summary
    await expect(this.emailText.first()).toHaveText(username);
  }
}

module.exports = { PaymentPage };
