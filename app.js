const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

const app = express();

mongoose.connect(keys.mongoURI);
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/artworkRoutes')(app);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log('Server is running!');
});
