// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.
  //++++++++++++++++++ below is authentication +++++++++
  // index route loads view.html
  app.get("/", function (req, res) {
    //== If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("../public/index.html");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  //=============================
  //   res.sendFile(path.join(__dirname, "../public/index.html"));
  // });
  //=============================
  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("../public/index.html");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  //++++++++++++++ above is authentication ++++++++++++++++++++++++++++++

  // add route loads the add.html page, where users can enter new books to the db
  app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/add.html"));
  });

  // all route loads the all.html page, where all books in the db are displayed
  app.get("/diary", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/diary.html"));
  });

  // symptom route loads the symptom.html page, where symptom books in the db are displayed
  app.post("/symptom", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/addsymptom.html"));
  });

  // food route loads the food.html page, where food books in the db are displayed
  app.post("/food", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/addfood.html"));
  });

  // drink route loads the food.html page, where drink books in the db are displayed
  app.post("/drink", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/adddrink.html"));
  });
}