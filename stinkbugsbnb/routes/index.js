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
router.get('/', function (req, res, next) {
  res.render('add-property');
});

router.post('/', function (req, res, next) {

  const data = req.body
  const test = new Property({
    property_name: data.property_name,
    price_per_night: data.price_per_night,
    //change this to new specs
    //property_specs: data.property_specs,
    guests: 1,
    bedrooms:2,
    beds: 3,
    bath: 4,

    location: data.property_specs,
    detailed_description: data.detailed_description,
    date_available: data.date_available,
    available_until: data.available_until,
    email_address: data.email_address
  })
  db.collection('properties').save(test, function (err) {
    if (err) return handleError(err);
    // saved!
  });
  res.redirect('display-property')
})

router.get('/display-property', function (req, res, next) {
  var data = db.collection('properties').find( {} );
  console.log(data)
  res.render('display-property', {test:data} )
})

router.get('/sign_up', function (req, res, next) {
  res.render('sign_up')
})

router.get('/login', function (req, res, next) {
  res.render('login')
})

module.exports = router;
