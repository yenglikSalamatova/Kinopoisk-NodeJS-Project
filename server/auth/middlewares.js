const isAuth = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("У вас нет прав");
  }
};

module.exports = { isAuth, isAdmin };
