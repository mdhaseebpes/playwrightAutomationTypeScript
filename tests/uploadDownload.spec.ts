import ExcelJs, { Worksheet } from 'exceljs';
import { test, expect, Page } from '@playwright/test';

interface Change {
  rowChange: number;
  colChange: number;
}

interface Output {
  row: number;
  column: number;
}

async function writeExcelTest(
  searchText: string,
  replaceText: string,
  change: Change,
  filePath: string
): Promise<void> {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  if (!worksheet) {
    throw new Error(`Worksheet "Sheet1" not found in file: ${filePath}`);
  }
  const output = await readExcel(worksheet, searchText);

  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(
  worksheet: Worksheet,
  searchText: string
): Promise<Output> {
  const output: Output = { row: -1, column: -1 };

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });

  return output;
}

//update Mango Price to 350.
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/rahulshetty/downloads/excelTest.xlsx");
test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '400';

  await page.goto(
    'https://rahulshettyacademy.com/upload-download-test/index.html'
  );
  const downloadPromise = page.waitForEvent('download');

  await page.getByRole('button', { name: 'Download' }).click();
  const download = await downloadPromise;

  const downloadedFilePath = await download.path();

  if (!downloadedFilePath) {
    throw new Error('Download path is not available');
  }

  await writeExcelTest(
    textSearch,
    updateValue,
    { rowChange: 0, colChange: 2 },
    downloadedFilePath
  );

  await page.locator('#fileinput').click();
  await page.locator('#fileinput').setInputFiles(downloadedFilePath);

  const textlocator = page.getByText(textSearch);
  const desiredRow = await page.getByRole('row').filter({ has: textlocator });

  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(
    updateValue
  );
  await page.pause();
});
