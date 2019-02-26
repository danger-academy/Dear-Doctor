require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
//const flash = require("connect-flash");
const db = require("./models");
const moment = require("moment");
moment().format();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));
//app.use(flash());

// Passport
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUnitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ======= Routes =========
// require("./routes/user-apiRoute")(app);
// require("./routes/symptom-apiRoute")(app);
// require("./routes/food-apiRoute")(app);
// require("./routes/drink-apiRoute")(app);
// require("./routes/diary-apiRoute")(app);
// require("./routes/htmlRoutes")(app);
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/user-apiRoutes.js"); //(app, passport);


// const models = require("./models");
// require("./config/passport/passport")(passport, models.User);

const syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;