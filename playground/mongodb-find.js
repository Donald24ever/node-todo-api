//const MongoClient = require('mongodb').MongoClient;

const{MongoClient, ObjectID} = require ('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp')

  //fetching all data from Todos db.
  /*
  db.collection('Todos').find().toArray().then((docs) => {
   console.log('Todos');
   console.log(JSON.stringify(docs, undefined, 2)); //2 for spacing
  }, (err) => {
  console.log('Unable to fetch todos', err);
 });
 */

//  fetching data from Todos db based on certain values
 /*
  db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2)); //2 for spacing
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });
*/

//quering the database by _ID
/*
db.collection('Todos').find({
  _id: new ObjectID('5e909ecc1c3a9c270cc89318')
}).toArray().then((docs) => {
  console.log('Todos');
  console.log(JSON.stringify(docs, undefined, 2)); //2 for spacing
}, (err) => {
  console.log('Unable to fetch todos', err);
});
*/

//Using other method of find() apart from toArray() like count()
/*
db.collection('Todos').find().count().then((count) => {
  console.log(`Todos count: ${count}`);
}, (err) => {
  console.log('Unable to fetch todos', err);
});
*/

db.collection('Users').find({name:"Donald"}).toArray().then((docs) => {
  console.log('Users');
  console.log(JSON.stringify(docs, undefined, 2)); //2 for spacing
}, (err) => {
  console.log('Unable to fetch users', err);
});

  //client.close();
});
