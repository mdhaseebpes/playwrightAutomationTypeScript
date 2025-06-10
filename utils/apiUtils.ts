// File: utils/apiUtils.js

export class ApiUtils {
  apiContext: any;
  loginPayLoad: any;

  constructor(apiContext: any, loginPayLoad: any) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: {
          userEmail: 'xxxxxxxx@gmail.com',
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

  async createOrder(orderPayload: any, token: string) {
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
