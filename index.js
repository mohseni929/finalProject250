const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
let passport = require("./middleware/passport");
const { ensureAuthenticated } = require("./middleware/checkAuth");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());

app.use(passport.session());

// Routes start here

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/newSub/:id", ensureAuthenticated, reminderController.newSub);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/:subid", ensureAuthenticated, reminderController.viewSub);

app.get("/reminder/edit/:id/:subid", ensureAuthenticated, reminderController.edit);

app.get("/friends", ensureAuthenticated, reminderController.friendList);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

// app.post("/reminder/", ensureAuthenticated, reminderController.createSub);

app.post("/reminder/update/:id/:subid", ensureAuthenticated, reminderController.update);;

app.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);

app.post("/friends", ensureAuthenticated, reminderController.addFr);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", passport.authenticate('local', { failureRedirect: '/login' }),
reminderController.list);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});


