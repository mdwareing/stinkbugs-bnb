var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


var mongoDB = 'mongodb://admin123:admin123@ds161700.mlab.com:61700/stinkbugs-bnb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('../models/Property');
const Property = mongoose.model('Property');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add-property');
});

router.post('/', function(req, res, next) {

  const data = req.body
  const test = new Property({
    property_name: data.property_name,
    price_per_night: data.price_per_night,
    //change this to new specs
    //property_specs: data.property_specs,
    guests: data.guests,
    bedrooms: data.bedrooms,
    beds: data.beds,
    bath: data.bath,
    location: data.property_specs,
    detailed_description: data.detailed_description,
    date_available: data.date_available,
    available_until: data.available_until,
    email_address: data.email_address
  })
  db.collection('properties').insert(test);
  res.redirect('display-property')
})

router.get('/display-property', function (req, res, next) {
 Property.find()
   .exec(function (err, list_properties) {
     if (err) {
       return next(err);
     }
     res.render('display-property', {
       title: 'Book List',
       data: list_properties
     });
   });
})

module.exports = router;
