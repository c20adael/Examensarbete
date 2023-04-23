const fs = require('fs');


const csvString = fs.readFileSync('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LessRowsTest.csv', 'utf8');

const rows = csvString.split('\n');
const data = rows.map(function (row) {
    if(row.includes("\"")){
        console.log("ja");
    }else{
        console.log("nej")
    }
  return row.split(',');
});