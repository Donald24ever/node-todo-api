var mongoose = require('mongoose');
//Describing the Todo database model specifying the attributes for todo to have
var Todo = mongoose.model('Todo',  {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
//creating a new Todo
/*
var newTodo = new Todo({
  text: 'Cook dinner'
});

//Saving the Todo into the database
newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo')
})
*/

/*
var otherTodo = new Todo({
  text: 'Feed the cat',
  completed: true,
  completedAt: 123
});

otherTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save', e);
});
*/
