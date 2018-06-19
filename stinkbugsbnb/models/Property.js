const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropertySchema = new Schema({
    property_name: String,
    price_per_night: Number,
    property_specs: String,
    location: String,
    detailed_description: String,
    date_available: Date,
    available_until: Date,
    email_address: String
  });
  
module.exports = mongoose.model('Property', PropertySchema );