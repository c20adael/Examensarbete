const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://127.0.0.1:27017/testcsv';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// Use the database object
const db = client.db('testcsv');
collName = 'rows'
const collection = db.collection(collName);

const fs = require('fs');
const fs2 = require('fs');

const csvString = fs.readFileSync('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LessRowsTest.csv', 'utf8');

const rows = csvString.split('\n');
const data = rows.map(function (row) {
  return row.split(',');
});
const firstElement = data.shift();

var csvFile = "";

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
    selectLooper()

}

var counter = 1;
var loopAmount = 1000;
function selectLooper(){
    if (loopAmount > 0){
        selectState();
        loopAmount--
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

    
    

    // Close the connection
  } catch (err) {
    console.log('Error connecting to MongoDB:', err);
  }
}


// Call the async function to connect to the database
connectToDB();

