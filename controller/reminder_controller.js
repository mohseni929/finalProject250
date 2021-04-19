const fetch = require("node-fetch");
let database = require("../database").Database;
let userModel = require("../database").userModel;

let remindersController = {
  list: (req, res) => {
    frReminders = userModel.findFriend(req.user[1]['friends'])
    console.log(frReminders)
    res.render("reminder/index", { reminders: req.user[1]['reminders'], groupReminders: frReminders });
  },

  new: (req, res) => {
    res.render("reminder/create", { parentId: null});
  },
  newSub: (req, res) => {
    let parentId = req.params.id
    res.render("reminder/create", { parentId: parentId});
  },
  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    
    let searchResult = req.user[1]['reminders'].find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult, parentItem: null});
    } else {
      frReminders = userModel.findFriend(req.user[1]['friends'])
      res.render("reminder/index", { reminders: req.user[1]['reminders'], groupReminders: frReminders });
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
      frReminders = userModel.findFriend(req.user[1]['friends'])
      res.render("reminder/index", { reminders: req.user[1]['reminders'], groupReminders: frReminders });
    }
  },

  create: (req, res) => {
    const parentId = req.body.parentId
    const idx = req.user[1]['reminders'].findIndex(reminder => reminder.id == parentId)
    if (parentId) {
      let subReminder = {
        id: parseInt(parentId + ('000' + (req.user[1]['reminders'][idx]['subtasks'].length + 1)).slice(-3)),
        title: req.body.title,
        description: req.body.description,
        completed: false,
      }
      req.user[1]['reminders'][idx]['subtasks'].push(subReminder);
      console.log(req.user[1]['reminders'][idx]['subtasks'])
      res.redirect("/reminder/" + parentId);
    } else {
      let reminder = {
        id: req.user[1]['reminders'].length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
        subtasks: [],
        tags: [],
      };
      req.user[1]['reminders'].push(reminder);
      res.redirect("/reminders");
    }
  },

  edit: async (req, res) => {
    let reminderToFind = req.params.id;
    let subtaskTofind = req.params.subid;
    let reminder = req.user[1]['reminders'].find(function (reminder) {
      return reminder.id == reminderToFind;
    });

    let parent = null;
    if (subtaskTofind != 0) {
      parent = reminder
      reminder = parent.subtasks.find((task) => task.id == subtaskTofind)
    }
    let coverPhoto = null;

    const thumbList = await helper.createThumbList(coverPhoto)
    await res.render("reminder/edit", { reminderItem: reminder, parentItem: parent, coverPhoto: reminder.cover, thumbs: thumbList});
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let subtaskTofind = req.params.subid;

    const updateRemIndex = req.user[1]['reminders'].findIndex(reminder => reminder.id == reminderToFind)
    if (subtaskTofind == 0) {

      req.user[1]['reminders'][updateRemIndex].title = req.body.title
      req.user[1]['reminders'][updateRemIndex].description = req.body.description
      req.user[1]['reminders'][updateRemIndex].date = req.body.date
      if (req.body.completed.toLowerCase() === 'true') {
        req.user[1]['reminders'][updateRemIndex].completed = true
      } else {
        req.user[1]['reminders'][updateRemIndex].completed = false
      }
      const tags = req.body.tags
      req.user[1]['reminders'][updateRemIndex].tags = tags.split(",")
      req.user[1]['reminders'][updateRemIndex].cover = req.body.cover 
      res.redirect("/reminder/" + reminderToFind);
    } else {
      const updateSubtaskIndex = req.user[1]["reminders"][updateRemIndex]["subtasks"].findIndex(subtask => subtask.id == subtaskTofind)
      req.user[1]['reminders'][updateRemIndex]["subtasks"][updateSubtaskIndex].title = req.body.title
      req.user[1]['reminders'][updateRemIndex]["subtasks"][updateSubtaskIndex].description = req.body.description
      req.user[1]['reminders'][updateRemIndex]["subtasks"][updateSubtaskIndex].date = req.body.date
      if (req.body.completed.toLowerCase() === 'true') {
        req.user[1]['reminders'][updateRemIndex]["subtasks"][updateSubtaskIndex].completed = true
      } else {
        req.user[1]['reminders'][updateRemIndex]["subtasks"][updateSubtaskIndex].completed = false
      }
      req.user[1]['reminders'][updateRemIndex]["subtasks"][updateSubtaskIndex].cover = req.body.cover
      res.redirect("/reminder/" + reminderToFind + "/" + subtaskTofind);
    }
  },

  delete: (req, res) => {
    const deleteRemIndex = req.user[1]['reminders'].findIndex(reminder => reminder.id == req.params.id)
    req.user[1]['reminders'].splice(deleteRemIndex, 1);
    res.redirect("/reminders");
  },

  friendList: (req, res) => {
    res.render("friend/index", { friends: req.user[1]['friends'] });
  },

  addFr: (req, res) => {
    console.log(req.body["email"])
    for (user of Object.values(database)) {
      if (user["email"] == req.body["email"] && req.user[1]["friends"].includes(req.body["email"]) == false) {
        req.user[1]['friends'].push(req.body["email"])
        res.render("friend/index", { friends: req.user[1]['friends'] });
      }
    }
    console.log(Object.values(database))
  },
};

let helper = {
  getRandomPhotos: async () => {
    const clientId = "MFIXUnNBZ5rBEdVfMPP0NQUbiT3FHJof03My-aGap4w"
    const num = "19"
    const photos = await fetch (
      `https://api.unsplash.com/photos/random?client_id=${clientId}&count=${num}&query=pattern`
    );
    const parsePohtos = await photos.json();
    let randomPhotos = [];
    for (aPhoto of parsePohtos) {
      randomPhotos.push(aPhoto["urls"]["regular"])
    }
    return randomPhotos
  },
  createThumbList: async (coverPhotoUrl) => {
    const thumbList = [];
    if (coverPhotoUrl) {
      thumbList.push(coverPhotoUrl);
    }
    const randomPhotos = await helper.getRandomPhotos();
    for (photo of randomPhotos) {
      thumbList.push(photo);
    }
    return thumbList;
  }
};

module.exports = remindersController;
