const isLoggedIn = require('../middleware/isLoggedIn');
const Comment = require('../models/Comment');
const Artwork = require('../models/Artwork');
const Folder = require('../models/Folder');

module.exports = (app) => {
  // CREATE COMMENT ROUTE
  app.post('/api/folder/:id/artwork/:artwork_id/comments', isLoggedIn, async (req, res) => {
    const { text } = req.body;
    const { name, googleId } = req.user;
    const comment = new Comment({ 
      text,
      author: {
        name,
        id: googleId
      }
    });
    const artwork = await Artwork.findById(req.params.artwork_id);

    await comment.save();
    await artwork.comments.push(comment);
    artwork.save();
    res.send(comment);
  });
  
  // SHOW ROUTE FOR UPDATE COMMENT FORM
  app.get('/api/folder/:id/artwork/:artwork_id/comments/:comment_id', async (req, res) => {
    const comment = await Comment.findById(req.params.comment_id);
    
    res.send(comment);
  });
  
  // UPDATE COMMENT ROUTE
  app.put('/api/folder/:id/artwork/:artwork_id/comments/:comment_id', isLoggedIn, async (req, res) => {
    const turnTheCommentIntoAShrub = await Comment.findByIdAndUpdate(req.params.comment_id, req.body);
    
    res.send(turnTheCommentIntoAShrub);
  });

  // DELETE COMMENT ROUTE
  app.delete('/api/folder/:id/artwork/:artwork_id/comments/:comment_id', isLoggedIn, async (req, res) => {
    const burnTheComment = await Comment.findByIdAndRemove(req.params.comment_id);

    res.send(burnTheComment);
  });
};
