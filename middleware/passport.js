const passport = require("passport");
let userModel = require("../database").userModel;
const LocalStrategy = require("passport-local").Strategy;

const localLogin = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      user = userModel.findEmail(email)
      if (user[1].password === password) {
        return user
        ? done(null, user)
        : done(null, false, {
            message: "Your login details are not valid. Please try again",
        });
    }
  }
);

passport.serializeUser(function (user, done) {
    done(null, user[1]['id']);
});
  
passport.deserializeUser(function (id, done) {
    let user = userModel.findId(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = passport.use(localLogin);