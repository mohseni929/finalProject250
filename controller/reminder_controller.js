const fetch = require("node-fetch");
let userModel = require('../models/userModel').userModel


let remindersController = {
  list: async (req, res) => {
    const fetchResponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=2c26accc258a2e85298e59260be86adb");
    const data = await fetchResponse.json();
    // const myReminders = await userModel.myReminders(req.user[0].user_id)
    // const frReminders = await userModel.friendReminders(req.user[0].user_id)
    const myReminders = await userModel.myReminders(req._passport.session.user)
    const frReminders = await userModel.friendReminders(req._passport.session.user)
    res.render("reminder/index", { reminders: myReminders, groupReminders: frReminders, weatherJSON: data });
  },

  new: (req, res) => {
    res.render("reminder/create", { parentId: null});
  },
  newSub: (req, res) => {
    let parentId = req.params.id
    res.render("reminder/create", { parentId: parentId});
  },
  listOne: async(req, res) => {
    const oneReminder = await userModel.getOneReminder(req.params.id)
    const subtasks = await userModel.getSubtasks(req.params.id)
    res.render("reminder/single-reminder", { oneReminder: oneReminder[0], subtasks: subtasks, parentItem: null});
  },

  viewSub: async(req, res) => {
    const parentReminder = await userModel.getOneReminder(req.params.id)
    const subReminder = await userModel.getOneReminder(req.params.subid)
    res.render("reminder/single-reminder", { oneReminder: subReminder[0], subtasks: null, parentItem: parentReminder[0]});
  },

  create: async (req, res) => {
    if (req.body.parentId) {
      await userModel.createReminder(req._passport.session.user, req.body.title, req.body.description, true)
      const newReminderId = await userModel.getNewReminderId(req._passport.session.user);
      await userModel.addSubtask(req.body.parentId, newReminderId[0].reminder_id)
      res.redirect("/reminder/" + req.body.parentId)
    } else {
      await userModel.createReminder(req._passport.session.user, req.body.title, req.body.description, false)
      res.redirect("/reminders");
    }
  },

  edit: async (req, res) => {
    const subtaskTofind = req.params.subid;
    const result = await userModel.getOneReminder(req.params.id);
    let oneReminder = result[0]
    let subtasks = null;
    let parent = null;
    if (subtaskTofind != 0) {
      parent = oneReminder;
      subtasks = null;
      const result2 = await userModel.getOneReminder(subtaskTofind);
      oneReminder = result2[0];
    } else {
      subtasks = await userModel.getSubtasks(req.params.id);
    }
    let coverPhoto = null;
    const thumbList = await helper.createThumbList(coverPhoto)
    res.render("reminder/edit", { reminderItem: oneReminder, subtasks: subtasks, parentItem: parent, coverPhoto: oneReminder.cover, thumbs: thumbList});
  },

  update: async (req, res) => {
    let reminderToFind = req.params.id;
    if (req.params.subid != 0) {reminderToFind = req.params.subid};
    
    let completed = 'false'
    if (req.body.completed.toLowerCase() === 'true') {
          completed = 'true'
    }

    let date = 'null';
    if (req.body.date) {
      date = "'" + req.body.date.toString() + "'"
    }
    await userModel.updateReminder(reminderToFind,
                                  req.body.title,
                                  req.body.description,
                                  completed,
                                  date,
                                  req.body.cover);
    
    if (req.params.subid == 0) {
      await userModel.deleteTags(reminderToFind); 
      for (tag of req.body.tags.split(",")) {
        await userModel.insertTag(reminderToFind, tag);
      }
      res.redirect("/reminder/" + req.params.id);
    } else {
      res.redirect("/reminder/" + req.params.id + "/" + req.params.subid);
    }
  },

  delete: async (req, res) => {
    await userModel.deleteTags(req.params.id);
    await userModel.deleteSubtasks(req.params.id);
    await userModel.deleteReminder(req.params.id);
    res.redirect("/reminders");
  },

  friendList: async (req, res) => {
    const friendsWhoCanSeeMyReminders = await userModel.getFriendswhoCanSeeMyReminders(req._passport.session.user);
    const friendsWhoShowRemindersToMe = await userModel.getFriendsWhoShowRemindersToMe(req._passport.session.user);
    res.render("friend/index", { friendsWhoCanSeeMyReminders: friendsWhoCanSeeMyReminders, friendsWhoShowRemindersToMe:friendsWhoShowRemindersToMe, msg: "" });
  },

  addFr: async (req, res) => {
    let friendsWhoCanSeeMyReminders = await userModel.getFriendswhoCanSeeMyReminders(req._passport.session.user);
    const friendsWhoShowRemindersToMe = await userModel.getFriendsWhoShowRemindersToMe(req._passport.session.user);
    const friend = await userModel.findFriend(req.body.email)
    let msg = null
    if (friend.length == 0) {
      msg = `${req.body.email} does not exist.`
    } else if (friend[0].user_id == req._passport.session.user)  {
      msg = `${req.body.email} is your email address.`
    } else {
      for (fr of friendsWhoCanSeeMyReminders) {
        if (fr.friend_id == friend[0].user_id) {
          msg = `${req.body.email} is already your friend.`
          break
        } 
      } 
      if (! msg) {
        await userModel.addFriend(req._passport.session.user, friend[0].user_id)
        friendsWhoCanSeeMyReminders = await userModel.getFriendswhoCanSeeMyReminders(req._passport.session.user);
        msg = `${req.body.email} is added to your friend list.`
      }
      
    }
    res.render("friend/index", { friendsWhoCanSeeMyReminders: friendsWhoCanSeeMyReminders, friendsWhoShowRemindersToMe:friendsWhoShowRemindersToMe, msg: msg });
  },
};

let helper = {
  getRandomPhotos: async () => {
    const num = "19"
    const photos = await fetch (
      `https://api.unsplash.com/photos/random?client_id=MFIXUnNBZ5rBEdVfMPP0NQUbiT3FHJof03My-aGap4w&count=${num}&query=pattern`
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
