module.exports = {
  ensureLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/not-authenticated');
    }
  }
};
