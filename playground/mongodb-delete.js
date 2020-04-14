//const MongoClient = require('mongodb').MongoClient;

const{MongoClient, ObjectID} = require ('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp')

//Delete Many
/*
db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  console.log(result);
})
*/

//Delete One
/*
db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  console.log(result);
})
*/

//findOneAndDelete(Targets the first one it sees)
/*
db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  console.log(result);
})
*/

//Assignment
/*
db.collection('Users').deleteMany({name: 'Donald'}).then((result) => {
  console.log(result);
})
*/

db.collection('Users').findOneAndDelete({
  _id: new ObjectID('5e91609f1c3a9c270cc8931a')
}).then((result) => {
  console.log(result);
})
//client.close();
});
