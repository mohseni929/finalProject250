March 20th
Group Members:
Markus
Mo
Akino
Atoosa


March 22th (Authentication Complete)
Markus:
I worked on the following tasks:
1. <Added POST request to login page.> - This task is responsible for initializing the authentication.
2. <Added names to inputs in login page named, email and password.> - This task helps with identifying and saving the posted information.
3. <Added local strategy to authenticate users.> - This allows users to log in if their email and password matches with the saved information within the database.
4. <Added a session time.> - This task allows a log in session to transfer between pages.
5. <Modified reminder_controller> - This task allows the pages to display information based on data saved within an account.
6. <Added a function located in middleware/checkAuth, to check if session is authenticated.> - Prevents errors from occuring when clicking on "Reminder's List" when logging in.

I also needed to research on Youtube and Google the following things:
1. <http://www.passportjs.org/packages/passport-local/>
2. <http://www.passportjs.org/docs/authenticate/>
3. <https://www.youtube.com/watch?v=-RCnNyD0L-s>
4. <https://stackoverflow.com/questions/16781294/passport-js-passport-initialize-middleware-not-in-use>
5. <https://stackoverflow.com/questions/19948816/passport-js-error-failed-to-serialize-user-into-session>

March 23/2021
Mo:
I worked on the following tasks:
1. <added gitignore> - This task is responsible for ignoring node_module folders.
2. <added registration function> - Allows new registerers to register a new login email and password.
3. <added function to check if the user already has a login> - This task is responsible for redirecting the user attempting to register but already is registered.

research done for this portion:
1. https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
2. https://www.w3schools.com/jsref/jsref_split.asp
3. https://stackoverflow.com/questions/1168807/how-can-i-add-a-key-value-pair-to-a-javascript-object
4. https://usefulangle.com/post/93/nodejs-post-parameters

March 23th
Akino:
I worked on the following tasks:
1. <Added update functions to reminder_constroll> - This task is responsible for edit reminder function.

March 23th
Atoosa:
I worked on the following tasks:
1. <Added deltete functions to reminder_constroll> - This task is responsible fo delete reminder function.

March 31th
Akino:
I worked on the following tasks:
1. <Modified database.js> - This task is responsible for subtask functionality.
2. <Modified single-reminder.ejs> - This task is responsible for showing subtasks.
3. <Added viewSub function to reminder_controller.js> - This taks is responsible for showing subtasks.
4. <Added subtask route to index.js> - This taks is responsible for showing subtasks.
5. <Modified edit.ejs> - This task is resposible for editing subtasks
6. <Modified edit function in reminder_controller.js> - This taks is responsible for editing subtasks.
7. <Modified edit route in index.js> - This taks is responsible for editing subtasks.
5. <Modified edit.ejs> - This task is resposible for updating subtasks
6. <Modified update function in reminder_controller.js> - This taks is responsible for updating subtasks.
7. <Modified update route in index.js> - This taks is responsible for updating subtasks.

April 3rd
Akino
I worked on the following tasks:
1. <Modified create.ejs> - This task is resposible for creating subtasks
2. <Added newSub function in reminder_controller.js> - This taks is responsible for creating subtasks.
3. <Modified create function in reminder_controller.js> - This taks is responsible for creating subtasks.
4. <Added newSub route in index.js> - This taks is responsible for creating subtasks.
I also needed to research on Google the following things:
1. https://getbootstrap.com/docs/4.5/components/list-group/


April 4th (Social Reminders completed)
Markus
I worked on the following tasks:
1. <Added friend/index.ejs> - This task is responsible for adding and viewing user friends.
2. <Modified partials/navbar.ejs> - This task is responsible for redirecting users to friend/index.ejs
3. <Modified auth_controller> - Removed loginSubmit, it was redundant code.
4. <Modified index.js> - Changed code to accommodate for removal of loginSubmit
5. <Modified database.js> - Added new friend list to users and new functions to return friend reminders.
6. <Modified reminder_controller> - When constructing index.ejs, friend reminders are sent as a variable.

April 4th
Akino
I worked on the following tasks:
1. <Added a tasks field to the database in database.js> - This task is resposible for tag functionality.
2. <Modified create function in reminder_controller.js> - This task is respoisible for tag functionality.
3. <Modified tag-view class in style.css> - This task is responsible for displaying tags.
4. <Modified single-reminder.ejs> - This task is responsible for displaying tags.
5. <Modified update function in reminder_controller.js> - This task is responsible for editing tags.
6. <Modified edit.ejs> - This task is responsible for editing tags.
7. <Modified index.ejs> - This task is responsible for displaying tags.

April 7th 
Atoosa and Akino 
I worked on the following tasks: 
1. <added a date field to database>This task is responsible for date functionality.
2. <modified index.ejs >This task is responsible for date functionality.
3. <modified single-reminder.ejs>This task is responsible for date functionality.
4. <modified edit.ejs >This task is responsible for date functionality.
5. <modified reminder_controller.js>This task is responsible for date functionality.
I also needed to research on Google the following things:
1. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date

April 18th
Akino
I worked on the following tasks:
1. <Modified database.ejs> - This task is respoinsible for the cover feature using unsplash
2. <Modified reminder_controller.js> This task is respoinsible for the cover feature using unsplash
3. <Modified edit.ejs> - This task is respoinsible for editing the cover using unsplash
I also needed to research on Google the following things:
1. https://unsplash.com/documentation
2. https://medium.com/@matt.readout/using-the-unsplash-api-to-search-for-photos-in-a-react-app-93f6262e692c

April 19th 
Atoosa 
I worked on the following tasks:
1. <Modified single-reminder.ejs> This task is showing the cover page in the reminder page 
2. <Modified style.css> - This task is respoinsible for editing the cover using unsplash

April 19th
Mo
I worked on the followinG:
1. added weather api by in <reminder_controller.js>. This shows the up to date weather of Vancouver.
2. modified <index.ejs> in the reminder folder to design the weather api output. 
research links:
https://openweathermap.org/
