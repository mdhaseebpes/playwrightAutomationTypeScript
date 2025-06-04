class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.signIn = page.locator("[value='Login']");
  }

  async goToUrl() {
    await this.page.goto('https://rahulshettyacademy.com/client');
  }

  async validLogin(username, password) {
    // Navigate to login
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signIn.click();
    // Wait for page to load products
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };
