//const MongoClient = require('mongodb').MongoClient;

const{MongoClient, ObjectID} = require ('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp')

//findOneAndUpdate takes some arguments like the id, $set, and returnOriginal
/*
db.collection('Todos').findOneAndUpdate({
  _id: new ObjectID('5e955fae1c3a9c270cc89320')
}, {
  $set: {
    completed: true
  }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});
*/

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('5e90e77f1c3a9c270cc89319')
}, {
  $set: {
    name: 'Donald'
  },
  $inc:{
    age: 2
  }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});


//client.close();
});
