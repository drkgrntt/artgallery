const multer = require('multer');
const cloudinary = require('cloudinary');
const keys = require('../config/keys');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');
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
  cloud_name: 'drkgrntt',
  api_key: keys.cloudinaryKey,
  api_secret: keys.cloudinarySecret
});

module.exports = (app) => {
  // INDEX ARTWORK ROUTE
  app.get('/api/artwork', async (req, res) => {
    const artwork = await Artwork.find().sort({ created: -1 });

    res.send(artwork);
  });
  
  // SHOW ARTWORK ROUTE
  app.get('/api/artwork/:id', async (req, res) => {
    const artwork = await Artwork.findById(req.params.id)
      // INCLUDE INDIVIDUAL COMMENTS
      .populate('comments');

    res.send(artwork);
  });

  // CREATE ARTWORK ROUTE
  app.post('/api/artwork', isLoggedIn, isAdmin, upload.single('image'), (req, res) => {
    // upload image file to cloudinary
    cloudinary.uploader.upload(req.file.path, (result) => {
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

      artwork.save();
      res.send(artwork);
    });
  });
  
  // UPDATE ARTWORK ROUTE
  app.put('/api/artwork/:id', isLoggedIn, isAdmin, async (req, res) => {
    const turnTheArtIntoAShrub = await Artwork.findByIdAndUpdate(req.params.id, req.body);
    
    res.send(turnTheArtIntoAShrub);
  });

  // DELETE ARTWORK ROUTE
  app.delete('/api/artwork/:id', isLoggedIn, isAdmin, async (req, res) => {
    const burnTheArt = await Artwork.findByIdAndRemove(req.params.id);

    res.send(burnTheArt);
  });
};
