const mongoose = require('mongoose');
const { Schema } = mongoose;

const artSchema = new Schema({
  image: String,
  artist: String,
  teacher: String,
  level: String,
  description: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('artwork', artSchema);
