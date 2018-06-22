var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var User = require('../models/User');
var bcrypt = require('bcrypt');

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
  res.redirect('login');
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
    email_address: data.email_address,
    host_id: req.session.userId

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

	//checking if email address already exists in db

	Users.find({email_address: data.email_address })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }

      if (result[0] === undefined){


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

	} else {
		res.render('sign_up', {
			errorMessage: "Email address already exists. Please use login"
		})
	  }

	});

})


router.get('/login', function (req, res, next) {
  res.render('login', {
    errorMessage: " "
  });
})

router.post("/login", function(req, res, next){
  const data = req.body;
  var users_email_address = data.email_address;



  Users.find({email_address: users_email_address })
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      // If email didnt match any in the DB, redirect to login
      if (undefined === result[0]) {
        renderLoginWithNoErrorMessage()
      // If email is in DB, check the passwords match
      } else {
        bcrypt.compare(data.password, result[0].password, function(err, isMatch){
          if(isMatch) {
            req.session.userId = result[0].user_name;
            res.redirect('display-property')
          } else {
            renderLoginWithNoErrorMessage()
          }
        });
      }
    });

    var renderLoginWithNoErrorMessage = function() {
      res.render('login', {
        errorMessage: "Username and password are not correct"
      });
    };


});


router.get('/add-property', function (req, res, next) {
  res.render('add-property')
})

router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/display-property');
      }
    });
  }
});

module.exports = router;
