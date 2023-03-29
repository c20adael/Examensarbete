/* const {createPool} = require('mysql')

const pool = createPool({
    host:"localhost",
    user: "root",
    password: "password",
    connectionlimit: 10
}) */

/* pool.query(`select * from testcsv.test`, (err, res)=>{
    if (console.log(res) == undefined) {
        return console.log(err)
    }
    else {
        return console.log(res)
    }
}) */

/* pool.query(`drop table testcsv.test;`, (err, res)=>{
    if (console.log(res) == undefined) {
        return console.log("error: " + err)
    }
    else {
        return console.log("response: " + res)
    }
}) */

/* pool.query(`create table testcsv.test (
    data_as_of	VARCHAR(512),
    start_date	VARCHAR(512),
    end_date	VARCHAR(512),
    group_	VARCHAR(512),
    year_	VARCHAR(512),
    month_	VARCHAR(512),
    state_	VARCHAR(512),
    condition_group	VARCHAR(512),
    condition_	VARCHAR(512),
    ICD10_codes	VARCHAR(512),
    age_Group	VARCHAR(512),
    COVID_19_deaths	VARCHAR(512),
    number_of_mentions VARCHAR(512),
    flag_	VARCHAR(512)
)`, (err, res)=>{
    if (console.log(res) == undefined) {
        return console.log("error: " + err)
    }
    else {
        return console.log("response: " + res)
    }
}) */
/* var sql3 = "testfowebconverter.csv" */
var sql2 = "use testcsv;"


/* var sql = "Alter table `testcsv.test` disable keys; "
var load = "load data infile 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/testfowebconverter.csv' into table `test` character set utf8mb4 fields terminated by ','"
var enclosed = ` enclosed by '"'`
var terminated = " lines terminated by '\\n' IGNORE 1 LINES; alter table `testcsv.test` enable keys"; */



/* console.log(sql2)
pool.query(sql2, (err, res)=>{
    if (console.log(res) == undefined) {
        return console.log("error: " + err)
    }
    else {
        return console.log("response: " + res)
    }
}) */





var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "testcsv"
});

const fs = require('fs');

const csvString = fs.readFileSync('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/test69.csv', 'utf8');
const rows = csvString.split('\n');
const data = rows.map(function (row) {
  return row.split(',');
});
const firstElement = data.shift();
console.log(firstElement)

//console.log(data);
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var i = 0
    data.forEach(rows => {
    var sql= "INSERT INTO test (data_as_of, start_date, end_date, group_, year_, month_, state_, condition_group, condition_, ICD10_codes, age_Group, COVID_19_deaths, number_of_mentions, flag_) VALUES ('"+rows[0]+"', '"+rows[1]+"', '"+rows[2]+"', '"+rows[3]+"', '"+rows[4]+"', '"+rows[5]+"', '"+rows[6]+"', '"+rows[7]+"', '"+rows[8]+"', '"+rows[9]+"', '"+rows[10]+"', '"+rows[11]+"', '"+rows[12]+"', '"+rows[13]+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("insert "+i+" done");
        i++;
      });
});
con.end()
});

/* con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "load data infile 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/test69.csv'"+
    " into table `test`"+
    " character set utf8mb4"+
    " fields terminated by ','"+
    " enclosed by '\"'"+
    " lines terminated by '\\n'"+
    " IGNORE 1 LINES;"
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
      con.end()
    });
  }); */

