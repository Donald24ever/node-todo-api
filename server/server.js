var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require ('./models/user');      //all using es6 distructuring.

var app = express();

//configuring the middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
  res.send({todos});
}, (e) => {
  res.status(400).send(e);
});

  });

  //GET /todos/1234324
  app.get('/todos/:id', (req,res) => {
    var id = req.params.id;
   //Then valid id using isValid and give it a 404 that will send back empty
   if(!ObjectID.isValid(id)) {
     return res.status(404).send();
}
  //using findbyId with a sucess if todo -send it back and if no todo send back 404 with empty bodyParser
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    //for success case
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })

  });

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};
