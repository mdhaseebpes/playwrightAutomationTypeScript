const base = require('@playwright/test');

exports.customtest = base.test.extend({
  testDataForOrder: {
    username: 'mdxxxxxxx@gmail.com',
    password: 'xxxxxx12@',
    productName: 'IPHONE 13 PRO',
  },
});
