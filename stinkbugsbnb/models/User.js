const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email');
var bcrypt = require('bcrypt');


const UserSchema = new Schema({
    user_name: {
    	type: String,
    	required: true,
    	minlength: 1,
    	maxlength: 50
    	},

    email_address: {
    	type: mongoose.SchemaTypes.Email,
    	required: true
    },

    password: {
      type: String,
      required: true,
      minlength: 8
    }

  });

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 8, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
})

module.exports = mongoose.model('User', UserSchema);
