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
const fs2 = require('fs')

const csvString = fs.readFileSync('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LessRowsTest.csv', 'utf8');

const rows = csvString.split('\n');
const data = rows.map(function (row) {
  return row.split(',');
});
const firstElement = data.shift();

var y = 0
var i = 0
var created_csv = "" 

async function loopInsert(){
    if( y<data.length){
        const start = performance.now();

        var row = data[y]
        const document = {data_as_of: row[0], start_date: row[1], end_date: row[2], group_: row[3], year_: row[4], month_: row[5], state_: row[6], condition_group: row[7], condition_: row[8], ICD10_codes: row[9], age_Group: row[10], COVID_19_deaths: row[11], number_of_mentions: row[12], flag_: row[13]}; 
        await collection.insertOne(document)
        console.log("insert "+i+" done");
        i++;    
        const end = performance.now();
        const elapsed = end - start;
        console.log(elapsed)
        created_csv += elapsed + ", query: " + (y+1) + "\n" 
        y++;
          
    }
    
}



async function connectToDB() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB');

    
    // Perform database operations
    const collectionExists = await collection.findOne();
    
    if (collectionExists){
        await collection.drop();
        console.log(`Collection '${collName}' dropped successfully`);

        await db.createCollection('rows', function(err, res) {
            if (err) {
              console.log('Error creating collection:', err);
              return;
            }
        
            console.log('Collection created successfully');
            
        });
    }else {
        console.log(`Collection '${collName}' does not exist`);
    
        await db.createCollection('rows', function(err, res) {
            if (err) {
              console.log('Error creating collection:', err);
              return;
            }
        
            console.log('Collection created successfully');
            
        });

    }
    
    for( p=0;p<data.length; p++){
        await loopInsert();
    }
    
    //const docs = await collection.find({}).toArray();
    //console.log('Found the following documents:', docs);

    // Close the connection
    fs2.writeFileSync('Pilotstudie_data/INSERT_data_MongoDB', created_csv);
    await client.close();
  } catch (err) {
    console.log('Error connecting to MongoDB:', err);
  }
}


// Call the async function to connect to the database
connectToDB();

