const mongoose = require('mongoose');
const { Schema } = mongoose;

const artSchema = new Schema({
  image: String,
  artist: String,
  teacher: String,
  level: String,
  description: String,
  created: { type: Date, default: Date.now },
  comments: [
    {
      // './Comment.js'
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
});

module.exports = mongoose.model('artwork', artSchema);
