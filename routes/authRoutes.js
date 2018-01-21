const passport = require('passport');
const isLoggedIn = require('../middleware/isLoggedIn');
const keys = require('../config/keys');

module.exports = (app) => {
  // LOGIN WITH GOOGLE ROUTE
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // CALLBACK ROUTE FROM GOOGLE OAUTH
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/gallery');
  });

  // LOGOUT ROUTE
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/gallery');
  });
  
  // CURRENT USER ROUTE
  app.get('/api/currentUser', (req, res) => {
    res.send(req.user);
  });

  // BECOME ADMIN ROUTE
  app.post('/api/admin', isLoggedIn, (req, res) => {
    if (req.body.adminCode === keys.adminCode) {
      req.user.isAdmin = true;
    }
    const user = req.user.save();

    res.send(user);
  });
}
