var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var User = require('../models/User');


var mongoDB = 'mongodb://admin123:admin123@ds161700.mlab.com:61700/stinkbugs-bnb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('../models/Property');
require('../models/User');
const Property = mongoose.model('Property');
const Users = mongoose.model('User');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/', function (req, res, next) {

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
  db.collection('properties').save(test, function (err) {
    if (err) return handleError(err);
    // saved!
  });
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
       data: list_properties,
       sessionId: req.session.userId
     });
   });
})

router.get('/signup', function (req, res, next) {
  	res.render('sign_up')
})

router.post('/signup_form', function (req, res, next) {
	const data = req.body
	// const User = mongoose.model('User');
	var new_user = new User ();
  new_user.user_name = data.user_name,
  new_user.email_address = data.email_address,
  new_user.password = new_user.generateHash(data.password)

	db.collection('users').save(new_user, function(err){
		if (err) return handleError(err);
	})
    req.session.userId = new_user.user_name;
  	res.redirect('display-property')
})

router.get('/login', function (req, res, next) {
  res.render('login')
})

router.post("/login", function(req, res, next){
  const data = req.body;

  // check that the user email exists in the database
  var users_email_address = data.email_address;
  var bcrypt = require('bcrypt');
  var users_password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(8), null)

  Users.find({email_address: users_email_address, password: users_password })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      if (result.password === undefined) {
        res.redirect('login');
      } else {
        req.session.userId = result[0].user_name;
      	res.redirect('display-property')
      }
    });


  // If it does, put it on the page
  // res.redirect('display-property')
});

router.get('/add-property', function (req, res, next) {
  res.render('add-property')
})

module.exports = router;
