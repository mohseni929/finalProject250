const passport = require("passport");
// let userModel = require("../database").userModel;
let userModel = require("../models/userModel").userModel;
const LocalStrategy = require("passport-local").Strategy;

const localLogin = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      result = await userModel.findEmail(email)
      user = JSON.parse(JSON.stringify(result))
      if (user[0].user_password === password) {
        return user
        ? done(null, user)
        : done(null, false, {
            message: "Your login details are not valid. Please try again",
        });
    }
  }
);

passport.serializeUser(function (user, done) {
    done(null, user[0]['user_id']);
});
  
passport.deserializeUser(function (id, done) {
    let user = userModel.findUserId(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = passport.use(localLogin);