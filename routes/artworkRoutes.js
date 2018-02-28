const multer = require('multer');
const cloudinary = require('cloudinary');
const keys = require('../config/keys');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');
const Folder = require('../models/Folder');
const Artwork = require('../models/Artwork');

// MULTER CONFIG
const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  }
});
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: keys.cloudName,
  api_key: keys.cloudinaryKey,
  api_secret: keys.cloudinarySecret
});

module.exports = (app) => {
  // SHOW ARTWORK ROUTE
  app.get('/api/folder/:id/artwork/:artwork_id', async (req, res) => {
    const artwork = await Artwork.findById(req.params.artwork_id)
      // INCLUDE INDIVIDUAL COMMENTS
      .populate('comments');

    res.send(artwork);
  });

  // CREATE ARTWORK ROUTE
  app.post('/api/folder/:id/artwork', isLoggedIn, isAdmin, upload.single('image'), (req, res) => {
    // upload image file to cloudinary
    cloudinary.v2.uploader.upload(req.file.path, { angle: 0 }, async (error, result) => {
      // store cloudinary url
      req.body.image = result.secure_url;

      const { image, artist, teacher, level, description } = req.body;
      const artwork = new Artwork({
        artist,
        teacher,
        level,
        description,
        image
      });
      const folder = await Folder.findById(req.params.id);

      await artwork.save();
      await folder.artworks.push(artwork);
      folder.save();
      res.send(artwork);
    });
  });
  
  // UPDATE ARTWORK ROUTE
  app.put('/api/folder/:id/artwork/:artwork_id', isLoggedIn, isAdmin, async (req, res) => {
    const turnTheArtIntoAShrub = await Artwork.findByIdAndUpdate(req.params.artwork_id, req.body);
    
    res.send(turnTheArtIntoAShrub);
  });

  // DELETE ARTWORK ROUTE
  app.delete('/api/folder/:id/artwork/:artwork_id', isLoggedIn, isAdmin, async (req, res) => {
    const burnTheArt = await Artwork.findByIdAndRemove(req.params.artwork_id);

    res.send(burnTheArt);
  });
};
