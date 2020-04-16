var mongoose = require('mongoose');
//Creating User model
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

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
