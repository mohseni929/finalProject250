let database = require("../database").Database;

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user[1]['reminders'] });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user[1]['reminders'].find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user[1]['reminders'] });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user[1]['reminders'].length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user[1]['reminders'].push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user[1]['reminders'].find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
  },

  delete: (req, res) => {
    // Implement this code
  },
};

module.exports = remindersController;
