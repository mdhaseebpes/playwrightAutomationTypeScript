import { test, expect, exceljs } from '@playwright/test';
import ExcelJs from 'exceljs';
const { excel } = require('./excelDemo');

async function readWriteExcel1(searchText, replaceText, change, filePath) {
  const workBook = new ExcelJs.Workbook();
  await workBook.xlsx.readFile(filePath);
  const workSheet = workBook.getWorksheet('Sheet1');

  const output = readExcel1(workSheet, searchText);

  if (output.row === -1 || output.col === -1) {
    console.log(`Text "${searchText}" not found in the worksheet.`);
    return;
  }

  const row = workSheet.getRow(output.row);
  const cell = row.getCell(output.col + change.colChange);
  cell.value = replaceText;
  row.commit(); // Optional

  await workBook.xlsx.writeFile(filePath);
  console.log('Replacement done and file saved.');
}

function readExcel1(workSheet, searchText) {
  const output = { row: -1, col: -1 };

  workSheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.col = colNumber;
        console.log(
          `rowNumber is ${output.row} and colNumber is ${output.col} and value that is replaces is ${cell.value}`
        );
      }
    });
  });

  return output;
}

test('download and upload file test', async ({ page }) => {
  const fruitName = 'Kivi';
  const price = '233';

  await page.goto(
    'https://rahulshettyacademy.com/upload-download-test/index.html'
  );
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  await downloadPromise;
  readWriteExcel1(
    fruitName,
    price,
    { rowChange: 0, colChange: 2 },
    '/Users/mohammedhaseeb/Desktop/Playwright/download.xlsx'
  );
  await page.locator('#fileinput').click();
  await page
    .locator('#fileinput')
    .setInputFiles('/Users/mohammedhaseeb/Desktop/Playwright/download.xlsx');
  const textLocator = page.getByText(fruitName);
  const desiredRowValue = await page
    .getByRole('row')
    .filter({ has: textLocator });
  await expect(desiredRowValue.locator('#cell-4-undefined')).toContainText(
    price
  );
});
