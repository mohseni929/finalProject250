let userModel = require('../models/userModel').userModel

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register", {msg: ""});
  },

  registerSubmit: async (req, res) => {
    let email = req.body.email;

    const user = await userModel.findEmail(email)
    if (user.length >= 1) {
      res.render("auth/register", {msg: `${email} already exists.`});
    } else {
      await userModel.addUser(email, req.body.first_name, req.body.last_name, req.body.password);
      res.redirect("/login");
    }
  }
};

module.exports = authController;