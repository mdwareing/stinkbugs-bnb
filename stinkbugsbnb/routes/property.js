var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

var mongoDB = 'mongodb://admin123:admin123@ds161700.mlab.com:61700/stinkbugs-bnb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('../models/Property');
require('../models/User');
const Property = mongoose.model('Property');


router.get('/:id', function (req, res, next) {
  Property.findOne ({
    '_id':req.params.id},
    function(error,property) {
    if(!property) {
      return res.redirect('/display-property');
   }
   res.render('property', {
     property: property
   });
 });
});

router.post('/sendemail', function (req, res, next) {
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
       host: 'smtp.ethereal.email',
       port: 587,
       auth: {
           user: 'ugk5sxyxzpyuj3db@ethereal.email',
           pass: 'eNgGXUpEdK2H7fXsCF'
       }
    });

    let mailOptions = {
      from: '"Villa Renter" <ugk5sxyxzpyuj3db@ethereal.email>',
      to: 'stinbugsbnb@gmail.com',
      subject: 'Rent boy',
      text: 'Give me the fucking villa and im bringing the dog',
      html: '<br>yeah boiiiiiii</br>'
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessagerUrl(info));
    });
  });

  res.redirect('/display-property');
})





























module.exports = router;
