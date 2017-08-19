var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
});

/**
 * GET /contact
 */
exports.contactGet = function(req, res) {
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 */

exports.contactPost = function(req, res) {
  // req.assert('name', 'Pole imię nie może być puste!').notEmpty();
  // req.assert('email', 'Email jest nieprawidłowy').isEmail();
  // req.assert('email', 'Pole Email nie może być puste!').notEmpty();
  // req.assert('message', 'Pole wiadomość nie może być puste!').notEmpty();
  // req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/contact');
  }

  var mailOptions = {
    from: req.body.name + ' ' + '<' + req.body.email + '>',
    to: 'paulvegan90@gmail.com',
    subject: '✔ Formularz Kontaktowy ze strony kandydata na burmistrza | Jakub Cebrykow',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, function(err) {
    req.flash('success', {
      msg: 'Dziękuję! Twoja wiadomość została wysłana!'
    });
    res.redirect('/contact');
  });
};
