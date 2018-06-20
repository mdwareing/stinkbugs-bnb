const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email');


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

module.exports = mongoose.model('User', UserSchema);
