var followers = require('../models/followers');

/**
 * GET FOLLOWERS PAGE AFTER LOGIN
 */

exports.followersGet = function(req, res) {
  if (req.isAuthenticated()) {
    var query = followers.find({});
    // console.log(query);
    query.exec(function(err,docs) {
          if (err) {
            throw Error;
          }
      res.render('followerspage', {
        title: 'Lista poparcia',
        followers: docs
      });
    });
  } else {
    res.redirect('/login');
  };
};
