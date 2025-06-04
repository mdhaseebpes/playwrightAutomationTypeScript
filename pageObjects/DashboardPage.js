class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchAddProduct(productName) {
    // Add specific product to cart
    await this.products.first().waitFor({ state: 'visible', timeout: 10000 });

    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      const productTitle = await this.products
        .nth(i)
        .locator('b')
        .textContent();
      if (productTitle?.trim() === productName) {
        await this.products.nth(i).locator('text=Add To Cart').click();
        break;
      }
    }
  }
}

module.exports = { DashboardPage };
