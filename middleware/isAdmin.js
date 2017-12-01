// CHECK IF THE USER IS AN ADMIN
module.exports = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(401).send({ error: 'You must be an admin to do that.' });
  }

  next();
};
