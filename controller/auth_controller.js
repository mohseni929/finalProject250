let database = require("../database").Database;

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  registerSubmit: (req, res) => {
    let user = req.body.email;
    let password = req.body.password;
    let maxId = 0;
    let flag = false;
    for (let name in database){
      if (database[name].email === user){
       flag = true;
      } 
      if (database[name].id > maxId){
        maxId = database[name].id;
      }
    }
    if(flag){
      res.redirect("/login");
    }else{
    let newUser = user.split("@")[0];
    database[newUser] = {
      id : maxId + 1,
      email : user,
      password : password,
      reminders: []
    }
    console.log(database);
    res.redirect("/login");
  }
  }
};

module.exports = authController;