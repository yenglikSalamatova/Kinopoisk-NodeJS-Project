const passport = require("passport");
const User = require("./../auth/User");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "290214553613-4fj7nhoi6v7uiknnvl5n555pan811h9h.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://127.0.0.1:8000/api/auth/google",
      scope: ["email", "profile"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = await User.findOne({ googleId: profile.id });
      if (!user.length > 0) {
        user = await new User({
          googleId: profile.id,
          full_name: profile.displayName,
          email: profile.emails[0].value,
        }).save();
      }
      return cb(null, user);
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
