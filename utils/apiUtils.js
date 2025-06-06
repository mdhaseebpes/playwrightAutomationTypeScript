// File: utils/apiUtils.js

class ApiUtils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: {
          userEmail: 'mdxxxxxxx@gmail.com',
          userPassword: 'xxxxxx12@',
        },
      }
    );

    const loginResponseJson = await loginResponse.json();
    console.log(loginResponse);
    const token = loginResponseJson.token;
    console.log(`token: ${token}`);
    return token;
  }

  async createOrder(orderPayload, token) {
    //order creation
    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayload,
        headers: {
          Authorization: token,
          'Content-type': 'application/json',
        },
      }
    );
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderId = orderResponseJson.orders[0];
    return orderId;
  }
}

module.exports = { ApiUtils };
