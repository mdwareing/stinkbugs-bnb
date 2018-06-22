var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

var mongoDB = 'mongodb://admin123:admin123@ds161700.mlab.com:61700/stinkbugs-bnb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('../models/Property');
require('../models/User');
const Property = mongoose.model('Property');


router.get('/:id', function (req, res, next) {
  Property.findOne({
      '_id': req.params.id
    },
    function (error, property) {
      if (!property) {
        return res.redirect('/display-property');
      }
      res.render('property', {
        property: property
      });
    });
});



router.post('/sendemail', function (req, res, next) {

  var options = {
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  }
  var mailer = nodemailer.createTransport(sgTransport(options));

  let mailOptions = {
    from: '"Villa Renter" <stinbug@gmail.com>',
    to: 'mdwareing@gmail.com',
    subject: `Booking request for ${req.body.property_name}`,
    text: `Lead guests name:
            Group Details: ${req.body.lead_guest_name}
            Number of adults: ${req.body.guests[0]}
            Numbers of children: ${req.body.guests[1]}
            Date of arrival: ${req.body.date_available}
            Date of departure: ${req.body.available_until}
            Contact email: ${req.body.email_address}
            `
  };
  
  mailer.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log(err)
    }
    console.log(res);
  });
  res.redirect('/display-property');
})





























module.exports = router;