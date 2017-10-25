const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  isAdmin: { type: Boolean, default: false }
});

mongoose.model('users', userSchema);
