const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartMenu = page.locator("[routerlink*='cart']");
    this.checkOutBtn = page.locator('text=Checkout');
  }

  async goToCart() {
    await this.cartMenu.click();
    await this.page
      .locator('div li')
      .first()
      .waitFor({ state: 'visible', timeout: 5000 });
  }

  async productExist(productName) {
    console.log(`product Name is  ${productName}`);
    const productExist = await this.page
      .locator(`h3:has-text("${productName}")`)
      .isVisible();
    expect(productExist).toBeTruthy();
  }

  async clickCheckOut() {
    // Proceed to checkout
    await this.checkOutBtn.click();
  }
}

module.exports = { CartPage };
