let database = require("../database").Database;

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    res.render("reminder/index", { reminders: req.user[1]['reminders'] })
  },

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;