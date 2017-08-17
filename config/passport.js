var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Sign in with Email and Password
passport.use(new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
  User.findOne({
    email: email
  }, function(err, user) {
    if (!user) {
      return done(null, false, {
        msg: 'Twój adres email  ' + email + ' nie jest powiązany z żadnym kontem. ' +
          'Sprawdź dokładnie swój adres email i spróbuj ponownie.'
      });
    }
    user.comparePassword(password, function(err, isMatch) {
      if (!isMatch) {
        return done(null, false, {
          msg: 'Niewłaściwy email lub hasło'
        });
      }
      return done(null, user);
    });
  });
}));

// Sign in with Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['name', 'email', 'gender', 'location'],
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({
      facebook: profile.id
    }, function(err, user) {
      if (user) {
        req.flash('error', {
          msg: 'Istnieje już istniejące konto połączone z Facebookem, które należy do Ciebie.'
        });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.name = user.name || profile.name.givenName + ' ' + profile.name.familyName;
          user.gender = user.gender || profile._json.gender;
          user.picture = user.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.facebook = profile.id;
          user.save(function(err) {
            req.flash('success', {
              msg: 'Twoje konto Facebook zostało powiązane.'
            });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({
      facebook: profile.id
    }, function(err, user) {
      if (user) {
        return done(err, user);
      }
      User.findOne({
        email: profile._json.email
      }, function(err, user) {
        if (user) {
          req.flash('error', {
            msg: 'Adres ' + user.email + 'jest już powiązany z innym kontem.'
          });
          done(err);
        } else {
          var newUser = new User({
            name: profile.name.givenName + ' ' + profile.name.familyName,
            email: profile._json.email,
            gender: profile._json.gender,
            location: profile._json.location && profile._json.location.name,
            picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
            facebook: profile.id
          });
          newUser.save(function(err) {
            done(err, newUser);
          });
        }
      });
    });
  }
}));

// Sign in with Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({
      google: profile.id
    }, function(err, user) {
      if (user) {
        req.flash('error', {
          msg: 'There is already an existing account linked with Google that belongs to you.'
        });
      } else {
        User.findById(req.user.id, function(err, user) {
          user.name = user.name || profile.displayName;
          user.gender = user.gender || profile._json.gender;
          user.picture = user.picture || profile._json.image.url;
          user.google = profile.id;
          user.save(function(err) {
            req.flash('success', {
              msg: 'Your Google account has been linked.'
            });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({
      google: profile.id
    }, function(err, user) {
      if (user) {
        return done(null, user);
      }
      User.findOne({
        email: profile.emails[0].value
      }, function(err, user) {
        if (user) {
          req.flash('error', {
            msg: user.email + ' is already associated with another account.'
          });
          done(err);
        } else {
          var newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            gender: profile._json.gender,
            location: profile._json.location,
            picture: profile._json.image.url,
            google: profile.id
          });
          newUser.save(function(err) {
            done(err, newUser);
          });
        }
      });
    });
  }
}));
