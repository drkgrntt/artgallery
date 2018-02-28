const multer = require('multer');
const cloudinary = require('cloudinary');
const keys = require('../config/keys');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');
const Folder = require('../models/Folder');

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
  // INDEX FOLDER ROUTE
  app.get('/api/folder', async (req, res) => {
    const folder = await Folder.find().sort({ created: -1 });

    res.send(folder);
  });
  
  // SHOW FOLDER ROUTE
  app.get('/api/folder/:id', async (req, res) => {
    const folder = await Folder.findById(req.params.id)
      // INCLUDE INDIVIDUAL ARTWORK PIECES
      .populate('artworks');

    res.send(folder);
  });

  // CREATE FOLDER ROUTE
  app.post('/api/folder', isLoggedIn, isAdmin, upload.single('image'), (req, res) => {
    // upload image file to cloudinary
    cloudinary.v2.uploader.upload(req.file.path, { angle: 0 }, (error, result) => {
      // store cloudinary url
      req.body.image = result.secure_url;

      const { image, title, description } = req.body;
      const folder = new Folder({
        title,
        description: description ? description : '',
        image
      });

      folder.save();
      res.send(folder);
    });
  });
  
  // UPDATE FOLDER ROUTE
  app.put('/api/folder/:id', isLoggedIn, isAdmin, async (req, res) => {
    const turnTheFolderIntoAShrub = await Folder.findByIdAndUpdate(req.params.id, req.body);
    
    res.send(turnTheFolderIntoAShrub);
  });

  // DELETE FOLDER ROUTE
  app.delete('/api/folder/:id', isLoggedIn, isAdmin, async (req, res) => {
    const burnTheFolder = await Folder.findByIdAndRemove(req.params.id);

    res.send(burnTheFolder);
  });
};
