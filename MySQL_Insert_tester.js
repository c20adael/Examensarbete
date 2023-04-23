var mysql = require('mysql');

// sets up the details for the connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "testcsv"
});

// adds the ability to read and write to files
const fs = require('fs')
const fs2 = require('fs')

// reads a file
const csvString = fs.readFileSync('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LessRowsTest.csv', 'utf8');

// formatting the file in to two aarrays. removing the first line in the file
const rows = csvString.split('\n');
const data = rows.map(function (row) {
  return row.split(',');
});
const firstElement = data.shift();
console.log(firstElement)

// creates a loop that goes through each line in the file and adds them to the database.
// this is also timed and then saved to a file.
var i = 0
var y = 0
var arrQ = []
var created_csv = "" 
function insertRows(){
    if( y<data.length){
        var row = data[y]
        var sql= "INSERT INTO test (data_as_of, start_date, end_date, group_, year_, month_, state_, condition_group, condition_, ICD10_codes, age_Group, COVID_19_deaths, number_of_mentions, flag_) VALUES ('"+row[0]+"', '"+row[1]+"', '"+row[2]+"', '"+row[3]+"', '"+row[4]+"', '"+row[5]+"', '"+row[6]+"', '"+row[7]+"', '"+row[8]+"', '"+row[9]+"', '"+row[10]+"', '"+row[11]+"', '"+row[12]+"', '"+row[13]+"')";
        const start = performance.now();
        con.query(sql, function (err, result) {
            if (err) throw err;
            const end = performance.now();
            console.log("insert "+i+" done");
            i++;
            const elapsed = end - start;
            console.log(elapsed)
            created_csv += elapsed + ", query: " + (y+1) + "\n" 
            y++;
            insertRows()
        });  
    }
    else{
        fs2.writeFileSync('Pilotstudie_data/INSERT_data_MySQL', created_csv);
        con.end()
    }
}

// the main program that connects to the database
// removes tables if exists
// adds table and then proceeds to run the formentioned function that adds each row
con.connect(async function (err) {
    if (err) throw err;
    console.log("Connected!");

    //Drops existing table
    var dropTableSQL = "drop table if exists test;"
    await con.query(dropTableSQL, function (err, result) {
        if (err) throw err;
        console.log("Table Dropped!")
    });

    //Creates table
    var createTableSQL = "CREATE TABLE test ( data_as_of VARCHAR(512), start_date VARCHAR(512), end_date VARCHAR(512), group_ VARCHAR(512), year_ VARCHAR(512), month_ VARCHAR(512), state_ VARCHAR(512), condition_group VARCHAR(512), condition_ VARCHAR(512), ICD10_codes VARCHAR(512), age_Group VARCHAR(512), COVID_19_deaths VARCHAR(512), number_of_mentions VARCHAR(512), flag_ VARCHAR(512) )"
    await con.query(createTableSQL, function (err, result) {
        if (err) throw err;
        console.log("Database table created!")
    });
    //inserts every row of the csv file into the database. approximately 546000 lines.
    insertRows() 
});



