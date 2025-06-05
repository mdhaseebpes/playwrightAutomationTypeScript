const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.signInBtn = page.locator("[value='Login']");
  }

  async goToUrl() {
    await this.page.goTo('https://rahulshettyacademy.com/client');
  }

  async validLogin(username, password) {
    await this.username.fill(email);
    await this.password.fill('xxxxxxx12@');
    await this.signInBtn.click();
    await page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };
