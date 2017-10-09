const mongoose = require('mongoose');
const { Schema } = mongoose;

const artSchema = new Schema({
  image: String,
  artist: String,
  class: String,
  grade: String,
  description: String
});

mongoose.model('artwork', artSchema);