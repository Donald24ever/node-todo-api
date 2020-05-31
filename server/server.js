var env = process.env.NODE_ENV || 'development';
console.log('env ****', env);

if (env === 'development'){
process.env.PORT = 3000;
process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp';
}else if (env === 'test'){
process.env.PORT = 3000;
process.env.MONGODB_URI='mongodb://localhost:27017/TodoAppTEST';
}

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require ('./models/user');      //all using es6 distructuring.

var app = express();
//Deploying to Heroku where by everywhere there is 3000 will be changed to port
const port = process.env.PORT;

//configuring the middleware with this you can send json to express.
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
  });

  });

//Delete todos
app.delete('/todos/:id', (req,res) => {
//get id
var id = req.params.id;
//Validate the Id --> not valid? return 404
if(!ObjectID.isValid(id)) {
  return res.status(404).send();
}
Todo.findByIdAndRemove(id).then((todo) => {
  if (!todo) {
    return res.status(404).send();
  }
  //for success case
  res.send({todo});
}).catch((e) => {
  res.status(400).send();
} );
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  //_pick takes an object which is the body and an array of properties you want to pull off if they exist

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

//Post users
app.post('/users', (req, res) => {
var body = _.pick(req.body, ['email', 'password']);
var user = new User(body);

user.save().then(() => {
   return user.generateAuthToken(); //return is used cos we are expecting a chained promise
    //res.send(user);
  }).then ((token) =>{
    res.header('x-auth',token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};
