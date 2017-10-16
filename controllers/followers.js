var followers = require('../models/followers');

/**
 * GET FOLLOWERS PAGE AFTER LOGIN
 */

exports.followersGet = function(req, res) {
  if (req.isAuthenticated()) {
    var query = followers.find({});
    query.exec(function(err, docs) {
      if (err) {
        throw Error;
      }
      res.render('followerspage', {
        followers: docs
      });
    });
  } else {
    res.redirect('/login');
  };
};
