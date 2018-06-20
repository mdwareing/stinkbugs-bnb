var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

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

module.exports = router;
