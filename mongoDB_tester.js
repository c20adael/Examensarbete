const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'testcsv';

const client = new MongoClient(url);

// Connect to the MongoDB server
client.connect(function(err) {
    console.log("entered connect")
  if (err) {
    console.log('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected successfully to MongoDB');

  const db = client.db(dbName);

  const collection = db.collection('mycollection');
  const document = { name: 'John Doe', age: 30 };
  collection.insertOne(document, function(err, result) {
    if (err) {
      console.log('Error inserting document:', err);
      return;
    }

    console.log('Document inserted successfully:', result.ops[0]);

    client.close();
  });
});
