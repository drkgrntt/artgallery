const mongoose = require('mongoose');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');

const Artwork = require('../models/Artwork');

module.exports = (app) => {
  app.get('/api/artwork', async (req, res) => {
    const artwork = await Artwork.find().sort({ created: -1 });

    res.send(artwork);
  });

  app.get('/api/artwork/:id', async (req, res) => {
    const artwork = await Artwork.findById(req.params.id);

    res.send(artwork);
  });

  app.post('/api/artwork', isLoggedIn, isAdmin, (req, res) => {
    const { image, artist, teacher, level, description } = req.body;

    const artwork = new Artwork({
      image,
      artist,
      teacher,
      level,
      description
    });

    artwork.save();
    res.redirect('/');
  });
};
