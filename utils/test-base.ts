import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
  username: string;
  password: string;
  productName: string;
}

export const customtest = baseTest.extend<{
  testDataForOrder: TestDataForOrder;
}>({
  testDataForOrder: {
    username: 'xxxxxxxx@gmail.com',
    password: 'xxxxxx12@',
    productName: 'IPHONE 13 PRO',
  },
});
