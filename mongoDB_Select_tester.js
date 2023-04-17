const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://127.0.0.1:27017/testcsv';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// db is the variable that holds the selected database.
// collName stands for collectionName and is used to access the collection called "rows".
const db = client.db('testcsv');
collName = 'rows';
const collection = db.collection(collName);

// fs is needed for working with the file system on the computer.
const fs = require('fs');
const fs2 = require('fs');

const csvString = fs.readFileSync('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LessRowsTest.csv', 'utf8');

//
// removing the first row in the document.
const rows = csvString.split('\n');
const data = rows.map(function (row) {
  return row.split(',');
});
const firstElement = data.shift();

// sets up the file that will save the data.
var csvFile = "";

// The function below selects a random document in the mongoDB database collection.
// After the select is done map is used to access the state in the USA that the document has stored.
// Then the function "selectQuery" gets passed the value.
async function selectState(){
    var state = await collection.aggregate([{ $sample: { size: 1 } }]);
    var arrayState = await state.toArray(function(err, result) {
        if (err) {
            console.log('Error selecting random document:', err);
            return;
          }
          
    })
    arrayState = arrayState.map(row => row.state_);
    arrayState = arrayState[0];
    console.log(arrayState);
    selectQuery(arrayState);
}

// selectQuery uses the value passed in to do another select query that tries to find all
// The documents where the value exists. This is timed.
// The Result from the select is then turned into an array.
// Information is saved to a var and then the process is repeated.
async function selectQuery(arrayState){
    const start = performance.now();
    var collectedResult = await collection.find({state_: arrayState})
    const end = performance.now();
    const elapsed = end - start;
    var objectArray = await collectedResult.toArray(function(err, result) {
        if (err) {
            console.log('Error selecting random document:', err);
            return;
          }
          
    })
    csvFile += arrayState +", "+ elapsed + ", "+ objectArray.length +", \n";
    //console.log(objectArray)
    console.log("select "+counter+" done");
    counter++;
    selectLooper();

}

// selectLooper runs the function selectState a sertain amount of times.
// Or exits the connection.
var counter = 1;
var loopAmount = 1000;
function selectLooper(){
    if (loopAmount > 0){
        selectState();
        loopAmount--;
    }else{
        fs2.writeFileSync('old_test_data/test_data_mongoDB_SELECT', csvFile);
        client.close();
    }
}

async function connectToDB() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB');
    
    // Perform database operations
    selectLooper();
  } catch (err) {
    console.log('Error connecting to MongoDB:', err);
  }
}


// Call the async function to connect to the database
connectToDB();

