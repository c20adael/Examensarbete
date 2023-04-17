var mysql = require('mysql');
const fs = require('fs')

// sets up the details for the connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "testcsv"
});

// The selectState function randomly chooses a value from a column in the database and passes it on
function selectState(){
    var selectRandomQuery = "SELECT state_ FROM test  ORDER BY RAND ( )  LIMIT 1";
    con.query(selectRandomQuery, function (err, result){
        if (err) throw err;
        console.log("select done");
        state = result.map(row => row.state_);
        state = state[0];

        selectQuery(state);
    })
}

// The selectQuery function is primed by the previous function that gives it the parameter.
// It then searches for the rows with said parameter
var queryResults = [];
var csvFile = "";
function selectQuery(state){
    console.log(state);
    csvFile += state +", ";
    const start = performance.now();
    var selectAllQuery = "SELECT * FROM test WHERE state_ = '"+state+"'";
    con.query(selectAllQuery, function (err, result){
        if (err) throw err;
        const end = performance.now();
        const elapsed = end - start;
        csvFile += elapsed + ", "+ result.length +", \n";
        queryResults[counter] = result;
        console.log("select "+counter+" done");
        counter++;
        console.log(elapsed);
        console.log(result.length);
        selectLooper();
    })
}
var counter = 1;
var loopAmount = 1000;
function selectLooper(){
    if (loopAmount > 0){
        selectState();
        loopAmount--
    }else{
        fs.writeFileSync('old_test_data/test_data_MySQL_SELECT', csvFile);
        con.end();
    }
}

// the main program that connects to the database
// and runs the selection functions
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var state;
    selectLooper();
});

