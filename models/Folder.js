const mongoose = require('mongoose');
const { Schema } = mongoose;

const folderSchema = new Schema({
  image: String,
  title: String,
  description: String,
  created: { type: Date, default: Date.now },
  artworks: [
    {
      // './Artwork.js'
      type: mongoose.Schema.Types.ObjectId,
      ref: 'artwork'
    }
  ]
},
{
  usePushEach: true
});

module.exports = mongoose.model('folder', folderSchema);
