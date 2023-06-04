const isAuth = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { isAuth };
