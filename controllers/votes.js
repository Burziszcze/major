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
      msg: 'Ups! coś poszło nie tak i twój wyraz poparcia nie powędrował do bazy, spróbuj ponownie!'
    });
    return res.redirect('/');
  } else {
    req.flash('success', {
      msg: 'Dziekuję za poparcie mnie w nadchodzących wyborach!'
    });
  }
  res.redirect('/');
}
