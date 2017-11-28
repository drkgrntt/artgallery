const mongoose = require('mongoose');
const isLoggedIn = require('../middleware/isLoggedIn');
const Comment = require('../models/Comment');
const Artwork = require('../models/Artwork');

module.exports = (app) => {
  app.post('/api/artwork/:id/comments', isLoggedIn, async (req, res) => {
    const { text } = req.body;
    const { name, id } = req.user;

    const comment = new Comment({ 
      text,
      author: {
        name, id
      }
    });
    const artwork = await Artwork.findById(req.params.id);

    await comment.save();
    await artwork.comments.push(comment);
    artwork.save();
    res.send(comment);
  });
  
  app.get('/api/artwork/:id/comments/:comment_id', async (req, res) => {
    const comment = await Comment.findById(req.params.comment_id);
    
    res.send(comment);
  });
  
  app.put('/api/artwork/:id/comments/:comment_id', isLoggedIn, async (req, res) => {
    const turnTheCommentIntoAShrub = await Comment.findByIdAndUpdate(req.params.comment_id, req.body);
    
    res.send(turnTheCommentIntoAShrub);
  });

  app.delete('/api/artwork/:id/comments/:comment_id', isLoggedIn, async (req, res) => {
    const burnTheComment = await Comment.findByIdAndRemove(req.params.comment_id);

    res.send(burnTheComment);
  });
};
