import ExcelJs from 'exceljs';

async function readExcelTest() {
  const workBook = new ExcelJs.Workbook();

  await workBook.xlsx.readFile(
    '/Users/mohammedhaseeb/Desktop/Playwright/download.xlsx'
  );
  const workSheet = workBook.getWorksheet('Sheet1');

  workSheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      console.log(cell.value);
    });
  });
}

async function readExcelSpecificDataTest() {
  const workBook = new ExcelJs.Workbook();

  await workBook.xlsx.readFile(
    '/Users/mohammedhaseeb/Desktop/Playwright/download.xlsx'
  );
  const workSheet = workBook.getWorksheet('Sheet1');

  workSheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === 'Banana') {
        console.log(
          ` rowNumber is ${rowNumber} and colNumber is ${colNumber} and value is ${cell.value}`
        );
      }
    });
  });
}

async function writeExcelSpecificDataTest() {
  const workBook = new ExcelJs.Workbook();
  const output = { row: -1, col: -1 };

  await workBook.xlsx.readFile(
    '/Users/mohammedhaseeb/Desktop/Playwright/download.xlsx'
  );
  const workSheet = workBook.getWorksheet('Sheet1');

  workSheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === 'Watermelon') {
        output.row = rowNumber;
        output.col = colNumber;
        console.log(
          ` rowNumber is ${output.row} and colNumber is ${output.col} and value that is replaces is ${cell.value}`
        );
      }
    });
  });

  const cell = workSheet.getCell(output.row, output.col);
  cell.value = 'Banana';
  await workBook.xlsx.writeFile(
    '/Users/mohammedhaseeb/Desktop/Playwright/download.xlsx'
  );
}

//readExcelTest();
//readExcelSpecificDataTest();
//writeExcelSpecificDataTest();

//code optimisation of reading excel and write excel

async function readWriteExcel(searchText, replaceText, filePath) {
  const workBook = new ExcelJs.Workbook();
  await workBook.xlsx.readFile(filePath);
  const workSheet = workBook.getWorksheet('Sheet1');

  const output = readExcel(workSheet, searchText);

  if (output.row === -1 || output.col === -1) {
    console.log(`Text "${searchText}" not found in the worksheet.`);
    return;
  }

  const row = workSheet.getRow(output.row);
  const cell = row.getCell(output.col);
  cell.value = replaceText;
  row.commit(); // Optional

  await workBook.xlsx.writeFile(filePath);
  console.log('Replacement done and file saved.');
}

function readExcel(workSheet, searchText) {
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

readWriteExcel(
  'Banana',
  'Alphonso',
  '/Users/mohammedhaseeb/Desktop/Playwright/download.xlsx'
);

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

readWriteExcel1(
  'Apple',
  350,
  { rowChange: 0, colChange: 2 },
  '/Users/mohammedhaseeb/Desktop/Playwright/download.xlsx'
);
