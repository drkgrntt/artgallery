const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: String,
  author: {
    id: {
      // './User.js'
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    name: String
  },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('comment', commentSchema);
