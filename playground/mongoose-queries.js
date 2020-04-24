var {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const{user} = require('./../server/models/user');

var id = '5e96c8162f30d130f0f4dd4f';

if(!objectID.isValid(id)) {
  console.log('ID not valid');
}

/*

//For find

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});


//for findOne

Todo.findOne({
  _id:id
}).then((todo) => {
  console.log('Todos', todo);
});

*/

//Find by id
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by Id', todo);
}).catch((e) => console.log(e));

//For users

user.findById('5e96d2dcc157ee454c7d72c5').then(user) => {
  if(!user) {
    return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
}
