const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    displayName: String
  },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('comment', commentSchema);
