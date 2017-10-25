const passport = require('passport');
const User = require('../models/User');
const isLoggedIn = require('../middleware/isLoggedIn');
const keys = require('../config/keys');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/artwork');
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/artwork');
  });

  app.get('/api/currentUser', (req, res) => {
    res.send(req.user);
  });

  app.post('/api/admin', isLoggedIn, async (req, res) => {
    if (req.body.adminCode === keys.adminCode) {
      req.user.isAdmin = true;
    }
    const user = await req.user.save();

    res.send(user);
  });
}
