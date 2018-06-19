const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-type-email');


const PropertySchema = new Schema({
    property_name: {
    	type: String,
    	required: true,
    	minlength: 1,
    	maxlength: 50
    	},
    price_per_night: {
    	type: Number,
    	min: [0, 'Cannot be 0']
    },
    
    guests: {type: Number,required: true},
    bedrooms:{type: Number,required: true},
    beds: {type: Number,required: true},
    bath: {type: Number,required: true},

    location: {
    	type: String,
    	required: true
	    },
    detailed_description: String,
    date_available: {
    	type: Date,
    	default: Date.now
    },
    available_until: {
    	type: Date,
    	min: 0
    },
    email_address: {
    	type: mongoose.SchemaTypes.Email,
    	required: true
    }

  });
  
module.exports = mongoose.model('Property', PropertySchema);