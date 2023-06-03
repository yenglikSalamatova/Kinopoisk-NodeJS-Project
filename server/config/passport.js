const passport = require("passport");
const User = require("./../auth/User");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email })
        .then((user) => {
          if (user.password) {
            bcrypt.compare(password, user.password, function (err, result) {
              if (err) {
                return done(err);
              }
              if (result) {
                return done(null, user);
              }
            });
          } else {
            return done("Пользователь не найден");
          }
        })
        .catch((e) => {
          return done(e);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  //   console.log(user);
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  //   console.log(id);
  User.findById(id).then((user, err) => {
    done(err, user);
  });
});
