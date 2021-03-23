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
    const updateRemIndex = req.user[1]['reminders'].findIndex(reminder => reminder.id == req.params.id)

    req.user[1]['reminders'][updateRemIndex].title = req.body.title
    req.user[1]['reminders'][updateRemIndex].title = req.body.description
    if (req.body.completed.toLowerCase() === 'true') {
      req.user[1]['reminders'][updateRemIndex].completed = true
    } else {
      req.user[1]['reminders'][updateRemIndex].completed = false
    }
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    const deleteRemIndex = req.user[1]['reminders'].findIndex(reminder => reminder.id == req.params.id)
    req.user[1]['reminders'].splice(deleteRemIndex, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
