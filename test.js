const fs = require('fs');


const csvString = fs.readFileSync('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LessRowsTest.csv', 'utf8');

function replaceAt(index, replacement, str) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}
/* var teststr = "hej";
teststr = replaceAt(1,"p",teststr); */




const rows = csvString.split('\n');
const data = rows.map(function (row) {
    if(row.includes("\"")){
        var foundquote = false;
        for(i=0; i<row.length; i++){
            
            if(row.charAt(i)== "\""){
                foundquote =  !foundquote;
                console.log(foundquote);
                //console.log(row.charAt(i),row.charAt(i+1),row.charAt(i+2),row.charAt(i+3))
            }
            if(foundquote == true && row.charAt(i)== ","){
                //console.log(row.charAt(i),row.charAt(i+1),row.charAt(i+2),row.charAt(i+3))
                row = replaceAt(i, ";", row);
            }

        }
        console.log(row)
        console.log("ja");
    }else{
        console.log("nej")
    }
  return row.split(',');
});