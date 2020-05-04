var {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const{user} = require('./../server/models/user');

/*
//To remove all
Todo.remove({}).then((result) =>{
  console.log(result);
});
*/

//find one and remove
Todo.findOneAndRemove({_id: '5eaff5c163eac01b905c47ce'}).then((todo) => {

});
//find by ID and remove
Todo.findByIdAndRemove('5eaff5c163eac01b905c47ce').then((todo) =>{
  console.log(todo);
});
