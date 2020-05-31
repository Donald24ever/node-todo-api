const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Note: User Schema contains the user models
var UserSchema = new mongoose.Schema ({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{Value} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access :{
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

//creating a sub method to prevent tokens and password from showing to the UserSchema
UserSchema.methods.toJSON = function () {
  var user = this;
   var userObject = user.toObject();
  //responsible for taking your mongoose variable 'user' and converting it to a regular Object where only the property variable of the docuent exist
   return _.pick(userObject, ['_id', 'email']); //using laodash _.pick to pick up the user id and email.

};

//Creating a method
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, '123abc').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

//Creating User model
var User = mongoose.model('User', UserSchema);

module.exports = {User};


/*
var user = new User({
  email: 'donald@example.com    '
});

user.save().then((doc) => {
  console.log('User saved', doc);        //Success case and error case
}, (e) => {
  console.log('Unable to save user', e);
});
*/
