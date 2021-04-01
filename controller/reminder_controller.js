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
      res.render("reminder/single-reminder", { reminderItem: searchResult, parentItem: null});
    } else {
      res.render("reminder/index", { reminders: req.user[1]['reminders'] });
    }
  },

  viewSub: (req, res) => {
    let reminderToFind = req.params.id;
    let subidToFind = req.params.subid;
    let reminder = req.user[1]['reminders'].find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (reminder != undefined) {
      subtask = reminder.subtasks.find((subtask) => subtask.id == subidToFind)
      if (subtask != undefined) {
        res.render("reminder/single-reminder", { reminderItem: subtask, parentItem: reminder});
      }
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
    let subtaskTofind = req.params.subid;

    let searchResult = req.user[1]['reminders'].find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    if (subtaskTofind == 0) {
      res.render("reminder/edit", { reminderItem: searchResult, parentItem: null });

    } else {
      subtask = searchResult.subtasks.find((task) => task.id == subtaskTofind)
      res.render("reminder/edit", { reminderItem: subtask, parentItem: searchResult });
    }
  },


  update: (req, res) => {
    let reminderToFind = req.params.id;
    let subtaskTofind = req.params.subid;
    const updateRemIndex = req.user[1]['reminders'].findIndex(reminder => reminder.id == reminderToFind)
    if (subtaskTofind == 0) {
      req.user[1]['reminders'][updateRemIndex].title = req.body.title
      req.user[1]['reminders'][updateRemIndex].description = req.body.description
      if (req.body.completed.toLowerCase() === 'true') {
        req.user[1]['reminders'][updateRemIndex].completed = true
      } else {
        req.user[1]['reminders'][updateRemIndex].completed = false
      }
      res.redirect("/reminder/" + reminderToFind);
    } else {
      const updateSubtaskIndex = req.user[1]["reminders"][updateRemIndex]["subtasks"].findIndex(subtask => subtask.id == subtaskTofind)
      req.user[1]['reminders'][updateRemIndex]["subtasks"][updateSubtaskIndex].title = req.body.title
      req.user[1]['reminders'][updateRemIndex]["subtasks"][updateSubtaskIndex].description = req.body.description
      if (req.body.completed.toLowerCase() === 'true') {
        req.user[1]['reminders'][updateRemIndex]["subtasks"][updateSubtaskIndex].completed = true
      } else {
        req.user[1]['reminders'][updateRemIndex]["subtasks"][updateSubtaskIndex].completed = false
      }
      res.redirect("/reminder/" + reminderToFind + "/" + subtaskTofind);
    }

  },

  delete: (req, res) => {
    const deleteRemIndex = req.user[1]['reminders'].findIndex(reminder => reminder.id == req.params.id)
    req.user[1]['reminders'].splice(deleteRemIndex, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
