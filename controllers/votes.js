var followers = require('../models/followers');

// post data from vote form to database

exports.followerscout = function(req, res) {
  followers.create({
    FirstName: req.body.firstname,
    LastName: req.body.lastname,
    Place: req.body.place,
    Email: req.body.email,
    Message: req.body.message
  });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', {
      msg: 'Coś się spierdoliło i twój wyraz poparcia jest chuja warty xd'
    });
    return res.redirect('/');
  } else {
    req.flash('success', {
      msg: 'Dziekuję za poparcie mnie w nadchodzących wyborach!'
    });
  }
  res.redirect('/');
}

// count number of collection

exports.displayFollowers = function(req, res) {
  followers.count({}).exec().then(function(count) {
    //tutaj wszystko nakurwiasz
    console.log("Followers number is: " + count);
    res.render('followers', {
      count: docs
    });
  }).catch(function(err) {
    console.log('wyjebalo sie: ', err)
  });
}

// followers.count({}).exec().then(function(count) {
//   //tutaj wszystko nakurwiasz
//   console.log("Followers number is: " + count);
// }).catch(function(err) {
//   console.log('wyjebalo sie: ', err)
// });
