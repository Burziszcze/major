var followers = require('../models/followers');

/**
 * GET FOLLOWERS PAGE AFTER LOGIN
 */

exports.followersGet = function(req, res) {
  if (req.isAuthenticated()) {
    var query = followers.find({});
    // console.log(query);
    query.exec(function(docs) {
      res.render('followerspage', {
        // title: 'followers',
        followers: docs
      });
    }).catch(function(err) {
      console.log('wyjebalo sie: ', err)
    });
  } else {
    res.redirect('/login');
  };
};
