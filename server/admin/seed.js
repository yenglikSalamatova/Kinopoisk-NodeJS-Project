const User = require("../auth/User");
const bcrypt = require("bcrypt");
function createAdmin() {
  const findAdmin = User.find({ isAdmin: true }).count();
  if (findAdmin == 0) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash("1", salt, function (err, hash) {
        new User({
          full_name: "Master",
          email: "master@mail.ru",
          password: hash,
          isAdmin: true,
        }).save();
      });
    });
  }
}

module.exports = createAdmin;
