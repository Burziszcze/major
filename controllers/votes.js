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

// count number of collection

exports.displayVotes = function(req, res) {
  followers.count({}).exec().then(function(count) {
    //tutaj wszystko nakurwiasz
    res.render('/', {
      counter: count
    })
    console.log("Followers number is: " + count);
  }).catch(function(err) {
    console.log('wyjebalo sie: ', err)
  });
}


// var display = followers.length;
// console.log('followers length is ' + display);
